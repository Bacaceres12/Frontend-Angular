import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
import { Tramites } from './../../../models/tramites';
import { ToastrService } from 'ngx-toastr';
import { TramitesService } from './../../../services/tramites.service';
import { Component,OnInit, OnDestroy } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulta-tramites',
  templateUrl: './consulta-tramites.component.html',
  styleUrls: ['./consulta-tramites.component.css']
})
export class ConsultaTramitesComponent {

  tramite:Tramites[]= [];

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  bsValue= new Date();
  listaVacia: any = undefined;
  isTableInitialized = false;
  showTable = false;

constructor(
  private tramitesService: TramitesService,
  private toastr: ToastrService,
  private tokenService: TokenService,
  private router: Router
){}


ngOnInit(): void {

  this.cargarTramites();

  this.dtOptions = {

    pageLength: 10,
    searching: true,
    responsive:true,
    info:true,
    language: {url:'//cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json'}

  };

}

ngOnDestroy(): void {
  if (this.dtTrigger) {
    this.dtTrigger.unsubscribe();
  }
}

cargarTramites(): void {
  this.tramitesService.lista().subscribe(
    data => {
      this.tramite = data;
      if (!this.isTableInitialized) {
        this.isTableInitialized = true;
        this.dtTrigger.next();
      }
      this.listaVacia = undefined;
      this.showTable = true;
    },
    err => {
      console.log(err);
      this.listaVacia = err.error.message;
      this.showTable = false;
    }
  );
}



editTramite(tramite: Tramites) {
  Swal.fire({
    title: 'Editar Trámite',
    html:
      `<label>Nombre:</label><input type="text" id="nombre" class="swal2-input" value="${tramite.nombre}"/>` +
      `<label>Carrera:</label><input type="text" id="carrera" class="swal2-input" value="${tramite.carrera}"/>`,
    focusConfirm: false,
    preConfirm: () => {
      const nombre = (<HTMLInputElement>document.getElementById('nombre')).value;
      const carrera = (<HTMLInputElement>document.getElementById('carrera')).value;
      tramite.nombre = nombre;
      tramite.carrera = carrera;
      this.tramitesService.update(tramite.idSolicitud, tramite).subscribe(
        response => {
          console.log(response);
          this.cargarTramites();
          Swal.fire({
            title: 'Trámite Actualizado',
            icon: 'success',
            timer: 1500,
            timerProgressBar: true,
          });
        },
        error => {
          console.error(error);
          Swal.fire({
            title: 'Error al Actualizar',
            text: error.message,
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      );
    }
  });
}


borrar(idSolicitud: number): void {
  Swal.fire({
    title: '¿Está seguro?',
    text: 'No podrá revertir esta acción',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      this.tramitesService.delete(idSolicitud).subscribe(
        response => {
          console.log(response);
          Swal.fire({
            title: 'Eliminado',
            text: 'El trámite ha sido eliminado',
            icon: 'success'
          }).then(() => {
            this.cargarTramites();
          });
        },
        error => {
          console.log(error);
          Swal.fire({
            title: 'Error',
            text: 'No se ha podido eliminar el trámite',
            icon: 'error'
          });
        }
      );
    }
  });
}

}
