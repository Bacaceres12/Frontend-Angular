import { Tramites } from 'src/app/models/tramites';
import { Subject } from 'rxjs';
import { TokenService } from './../../services/token.service';
import { TramitesService } from './../../services/tramites.service';
import { Component,  OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Consulta } from 'src/app/models/consulta';
@Component({
  selector: 'app-tramites',
  templateUrl: './tramites.component.html',
  styleUrls: ['./tramites.component.css']
})
export class TramitesComponent implements OnInit {

  tramite:Tramites[]= [];
  consultas: Consulta[] = [];

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  bsValue= new Date();

  listaVacia: any = undefined;
  mostrarOtroDescripcion: boolean = false;



  cc: number = null;
  nombre= '';
  jornada= '';
  carrera= '';
  numerosd= '';
  tiposol= '';
  fecha: Date = null;
  fechaConsulta: Date;

  Solicitud = [

    {nombre: "Cancelacion Asignatura"},
    {nombre: "Adicionar Asignatura"},
    {nombre: "Cita con el director"},
    {nombre: "Otro"},


  ];

mostrarFecha = true;
mostrarDescripcion= true;
mostrarCancelar = true;
asignatura = '';


onTiposolChange() {
  if (this.tiposol === 'Cita con el director') {
    this.mostrarFecha = true;
    this.mostrarDescripcion = false;
    this.mostrarCancelar = false;
    this.fechaConsulta = null;
  } else if (this.tiposol === 'Asignación de asignatura' || this.tiposol === 'Cancelación de asignatura') {
    this.mostrarFecha = false;
    this.mostrarDescripcion = true;
    this.mostrarCancelar = true;
    this.fechaConsulta = null;
  } else {
    this.mostrarFecha = false;
    this.mostrarDescripcion = false;
    this.mostrarCancelar = false;
    this.fechaConsulta = null;
  }
}




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
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }




  onCreate(): void {
    let fecha = new Date();
    let fechaConsulta = null;
    if (this.mostrarFecha) {
      fechaConsulta = new Date(this.fechaConsulta);
    } else {
      fechaConsulta = fecha;
    }
    const tramites = new Tramites(this.cc, this.nombre, this.jornada, this.carrera, this.numerosd, this.tiposol, fechaConsulta, fecha);
    this.tramitesService.save(tramites).subscribe(
      data => {
        this.toastr.success(data.message, 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/']);
      },
      err => {
        this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      }
    );
  }

  volver(): void {
    this.router.navigate(['/tramites']);
  }



  cargarTramites(): void {
    this.tramitesService.lista().subscribe(
      data => {

        this.tramite = data;
        this.dtTrigger.next();
        this.listaVacia = undefined;
      },
      err => {
        this.listaVacia = err.error.message;
      }
    );
  }


}
