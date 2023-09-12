import { NotificationService } from './../../services/notification.service';
import { TramitesService } from './../../services/tramites.service';
import { Tramites } from './../../models/tramites';
import { ConsultasService } from './../../services/consultas.service';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TokenService } from './../../services/token.service';
import { Component, OnInit, OnDestroy} from '@angular/core';
import Swal from 'sweetalert2';
import { Consulta } from 'src/app/models/consulta';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as vis from 'vis';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-consultas-d',
  templateUrl: './consultas-d.component.html',
  styleUrls: ['./consultas-d.component.css']
})
export class ConsultasDComponent implements OnInit {



  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  isTableInitialized = false;
  showTable = false;

  listaVacia: any = undefined;
  consultas: Consulta[] = [];
  currentDate: Date;
  private dataTable: any;
  filasActualizadas: number[] = [];


  constructor(
    private consultasService: ConsultasService,
    private tramitesService: TramitesService,
    private notificationService: NotificationService,
    private toastr: ToastrService,
    public tokenService: TokenService,
    private router: Router,

  ){}


  ngOnInit(): void {
    this.cargarConsultasTodas();
    this.currentDate = new Date();
    this.dtOptions = {
      pageLength: 10,
      searching: true,
      responsive: true,
      info: true,
      language: {url:'//cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json'}
    };


      this.notificationService.getNotificationObservable().subscribe(message => {
        if (this.tokenService.isUser()) {
          // Muestra la notificación al usuario normal
          this.toastr.info(message, 'Nueva notificación');
        }
      });
    }

  ngOnDestroy(): void {
    if (this.dtTrigger) {
      this.dtTrigger.unsubscribe();
    }
  }



  cargarConsultasTodas(): void {
    if (!this.isTableInitialized) {
      this.consultasService.listaConsultaTodas().subscribe(data => {
        this.consultas = data;
        this.dtTrigger.next();
        this.isTableInitialized = true;
        this.showTable = true;
      });
    }
  }



  actualizarConsulta(consulta: Consulta, index:number) {
    Swal.fire({
      title: 'Actualizar consulta',
      html: `
        <div class="form-group">
          <label for="estado">Estado:</label>
          <select id="estado" class="form-control">
            <option value="Aprobado">Aprobado</option>
            <option value="Rechazado">Rechazado</option>
            <option value="En tramite	">En tramite</option>
          </select>
        </div>
        <div class="form-group">
          <label for="respuesta">Respuesta:</label>
          <textarea id="respuesta" class="form-control"></textarea>
        </div>
      `,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Actualizar'
    }).then((result) => {
      if (result.isConfirmed) {
        const estado = (<HTMLSelectElement>document.getElementById('estado')).value;
        const respuesta = (<HTMLTextAreaElement>document.getElementById('respuesta')).value;

        consulta.estado = estado;
        consulta.Respuesta = respuesta;
        consulta.horaAprobacion = new Date();

        // Formatea la hora de aprobación
        const horaAprobacionFormatted = this.getFormattedDateTime(consulta.horaAprobacion);

        this.filasActualizadas.push(index);

        this.consultasService.updateConsulta(consulta.idConsulta, consulta).subscribe(
          () => {
            Swal.fire('Actualización Exitosa', 'La consulta ha sido actualizada correctamente.', 'success');
            this.cargarConsultasTodas();
          // Asegúrate de que la notificación se envíe solo a usuarios normales
          if (this.tokenService.isUser()) {
            this.notificationService.sendNotification('El estado del trámite ha sido actualizado.');
          }
            console.log('Consulta a actualizar:', consulta);

            // Muestra la hora formateada en la interfaz de usuario
            console.log('Hora de aprobación:', horaAprobacionFormatted);
          },
          (err) => {
            console.log(err);
            Swal.fire('Error', 'Ha ocurrido un error al actualizar la consulta.', 'error');
          }
        );
      }
    });
  }

  getFormattedDateTime(date: Date): string {
    const dia = date.getDate().toString().padStart(2, '0');
    const mes = (date.getMonth() + 1).toString().padStart(2, '0');
    const anio = date.getFullYear();
    let hora = date.getHours();
    const minutos = date.getMinutes().toString().padStart(2, '0');
    const segundos = date.getSeconds().toString().padStart(2, '0');

    let periodo = 'AM';

    // Convierte la hora al formato de 12 horas y determina si es AM o PM
    if (hora >= 12) {
      periodo = 'PM';
      hora -= 12;
    }

    // Asegura que la medianoche sea 12:00 AM y el mediodía sea 12:00 PM
    if (hora === 0) {
      hora = 12;
    }

    const horaFormatted = `${hora}:${minutos}:${segundos} ${periodo}`;

    return `${anio}-${mes}-${dia} ${horaFormatted}`;
  }

// consulta.tramitesEntity.nombre

verDetalleConsulta(consulta: Consulta) {
  let detallesHtml = `
    <p><strong>Nombre:</strong> ${consulta.tramitesEntity.nombre}</p>
    <p><strong>Semestre Cursando:</strong> ${consulta.tramitesEntity.semestre}</p>
    <p><strong>Tipo de solicitud:</strong> ${consulta.tramitesEntity.tiposol}</p>
    <p><strong>Nombre Asignatura:</strong> ${consulta.tramitesEntity.tiposol === 'Cita con el director' ? 'N/A' : consulta.tramitesEntity.asignatura}</p>
    <p><strong>Motivo de la solicitud:</strong> ${consulta.tramitesEntity.tiposol === 'Cancelacion Asignatura'|| consulta.tramitesEntity.tiposol === 'Adicionar Asignatura' || consulta.tramitesEntity.tiposol === 'Cita con el director' ? 'N/A' : consulta.tramitesEntity.motivo}</p>

    <p><strong>Estado:</strong> ${consulta.estado}</p>
    <p><strong>Respuesta:</strong> ${consulta.Respuesta}</p>
    <!-- Agrega más detalles según tus necesidades -->
  `;

  Swal.fire({
    title: 'Detalles de la solicitud',
    html: detallesHtml,
    confirmButtonText: 'Cerrar'
  });
}



}



