import { UsuariosService } from './../../services/usuarios.service';
import { Tramites } from 'src/app/models/tramites';
import { Subject } from 'rxjs';
import { TokenService } from './../../services/token.service';
import { TramitesService } from './../../services/tramites.service';
import { Component,  OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Consulta } from 'src/app/models/consulta';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  animations: [
    trigger('fadeInOut', [
      state('show', style({
        opacity: 1,
        display: 'block'
      })),
      state('hide', style({
        opacity: 0,
        display: 'none'
      })),
      transition('show => hide', [
        animate('0.3s')
      ]),
      transition('hide => show', [
        animate('0.3s')
      ]),
    ]),
  ],
  selector: 'app-tramites',
  templateUrl: './tramites.component.html',
  styleUrls: ['./tramites.component.css']
})
export class TramitesComponent implements OnInit {

  tramite:Tramites[]= [];
  consultas: Consulta[] = [];
  darkMode = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  bsValue= new Date();

  listaVacia: any = undefined;
  mostrarOtroDescripcion: boolean = false;
  mostrarInformacionAsignatura = false;

  mostrarAsignatura=false;

  cc: number = null;
  nombre= '';
  jornada= '';
  carrera= '';
  numerosd= '';
  tiposol= '';
  asignatura = '';
  motivo = '';
  semestre = '';
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


toggleInformacionAsignatura() {
  this.mostrarInformacionAsignatura = !this.mostrarInformacionAsignatura;
}

toggleOtroDescripcion() {
  this.mostrarOtroDescripcion = !this.mostrarOtroDescripcion;
}


onTiposolChange() {
  if (this.tiposol === 'Cita con el director') {
    this.mostrarFecha = true;
    this.mostrarDescripcion = false;
    this.mostrarCancelar = false;
    this.fechaConsulta = null;
    this.asignatura = null;
    this.mostrarInformacionAsignatura = false; // Ocultar la sección de información de asignatura
    this.mostrarOtroDescripcion = false; // Ocultar el cuadro adicional
  } else if (this.tiposol === 'Adicionar Asignatura' || this.tiposol === 'Cancelacion Asignatura') {
    this.mostrarFecha = false;
    this.mostrarDescripcion = true;
    this.mostrarCancelar = true;
    this.fechaConsulta = null;
    this.mostrarAsignatura = true;
    this.mostrarInformacionAsignatura = true; // Mostrar la sección de información de asignatura
    this.mostrarOtroDescripcion = false; // Ocultar el cuadro adicional
  } else if (this.tiposol === 'Otro') {
    this.mostrarFecha = false;
    this.mostrarDescripcion = false;
    this.mostrarCancelar = false;
    this.fechaConsulta = null;
    this.asignatura = null;
    this.mostrarAsignatura = false;
    this.mostrarInformacionAsignatura = false; // Ocultar la sección de información de asignatura
    this.mostrarOtroDescripcion = true; // Mostrar el cuadro adicional
  } else {
    this.mostrarFecha = false;
    this.mostrarDescripcion = false;
    this.mostrarCancelar = false;
    this.fechaConsulta = null;
    this.asignatura = null;
    this.mostrarAsignatura = false;
    this.mostrarInformacionAsignatura = false; // Ocultar la sección de información de asignatura
    this.mostrarOtroDescripcion = false; // Ocultar el cuadro adicional
  }
}



  constructor(
    private usuariosService: UsuariosService,
    private tramitesService: TramitesService,
    private tokenService: TokenService,
    private toastr: ToastrService,
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

    if (this.tokenService.isLogged()) {
      // Obtén los datos del usuario logueado
      this.cc = this.tokenService.getIdUsuario();
      this.nombre = this.tokenService.getNombreUsuario();
    }

  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  toggleDarkMode(): void {
    this.darkMode = !this.darkMode;
  }


  onCreate(): void {
    // Muestra una ventana de confirmación SweetAlert
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas enviar esta solicitud?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, enviar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // El usuario confirmó, ahora puedes enviar la solicitud
        let fecha = new Date();
        let fechaConsulta = null;
        if (this.mostrarFecha) {
          fechaConsulta = new Date(this.fechaConsulta);
        } else {
          fechaConsulta = fecha;
        }

        const tramites = new Tramites(this.cc, this.nombre, this.jornada, this.carrera, this.numerosd, this.tiposol, fechaConsulta, fecha, this.asignatura, this.motivo, this.semestre);
        this.tramitesService.save(tramites).subscribe(
          data => {
            this.toastr.success(data.message, 'OK', {
              timeOut: 3000, positionClass: 'toast-top-center'
            });
            this.router.navigate(['/']);
          },
          err => {
            this.toastr.error(err.error.message, 'Error', {
              timeOut: 3000,  positionClass: 'toast-top-center',
            });
          }
        );
      }
    });
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
