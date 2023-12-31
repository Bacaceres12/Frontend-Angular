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
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css']
})
export class ConsultasComponent implements OnInit {

  darkMode = false;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  isTableInitialized = false;
  showTable = false;

  listaVacia: any = undefined;
  consultas: Consulta[] = [];
  currentDate: Date;
  private dataTable: any;


  constructor(
    private consultasService: ConsultasService,
    private tramitesService: TramitesService,
    private toastr: ToastrService,
    public tokenService: TokenService,
    private router: Router,


  ){}


  ngOnInit(): void {
    this.cargarConsultas();

  }

  ngOnDestroy(): void {
    if (this.dtTrigger) {
      this.dtTrigger.unsubscribe();
    }
  }


  getEventClass(estado: string): string {
    switch (estado) {
      case 'Aprobado':
        return 'approved';
      case 'Rechazado':
        return 'rejected';
      case 'En Trámite':
        return 'in-progress';
      default:
        return ''; // Clase por defecto o ninguna
    }
  }

  getIconClass(estado: string): string {
    switch (estado) {
      case 'Aprobado':
        return 'fas fa-check-circle approved-icon animated-icon';
      case 'Rechazado':
        return 'fas fa-times-circle rejected-icon animated-icon';
      case 'En Trámite':
        return 'fas fa-hourglass-half in-progress-icon animated-icon';
      default:
        return 'fas fa-info-circle default-icon animated-icon'; // Icono por defecto
    }
  }

  toggleDarkMode(): void {
    this.darkMode = !this.darkMode;
  }






cargarConsultas(): void {
  this.consultasService.listaConsulta().subscribe(
    data => {
      this.consultas = data;
      this.listaVacia = undefined;
    },
    err => {
      this.listaVacia = err.error.message;
    }
  );
}



buscarConsulta(): void {
  const numerosd = (document.getElementById('numerosd') as HTMLInputElement).value;

  if (numerosd) {
    const consultaEncontrada = this.consultas.find(consulta => consulta.tramitesEntity.numerosd === numerosd);
    if (consultaEncontrada) {
      const detalleConsulta = `
        <table id="tablaConsultas" class="table table-bordered">
          <thead>
            <tr>
              <th>Número de trámite</th>
              <th>Nombre del solicitante</th>
              <th>Jornada</th>
              <th>Carrera</th>
              <th>Tipo de solicitud</th>
              <th>Fecha</th>
              <th>Respuesta</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${consultaEncontrada.tramitesEntity.numerosd}</td>
              <td>${consultaEncontrada.tramitesEntity.nombre}</td>
              <td>${consultaEncontrada.tramitesEntity.jornada}</td>
              <td>${consultaEncontrada.tramitesEntity.carrera}</td>
              <td>${consultaEncontrada.tramitesEntity.tiposol}</td>
              <td>${consultaEncontrada.tramitesEntity.fecha}</td>
              <td>${consultaEncontrada.Respuesta}</td>
              <td>${consultaEncontrada.estado}</td>
            </tr>
          </tbody>
        </table>
      `;
      document.getElementById('detalleConsulta').innerHTML = detalleConsulta;
      $(document).ready(function() {
        $('#tablaConsultas').DataTable();
      });
    } else {
      this.toastr.warning('No se encontró ninguna consulta con ese número de trámite');
    }
  } else {
    this.toastr.warning('Por favor, ingrese un número de trámite');
  }
}



descargarConsulta(): void {
  const numerosd = (document.getElementById('numerosd') as HTMLInputElement).value;

  if (numerosd) {
    const consultaEncontrada = this.consultas.find(consulta => consulta.tramitesEntity.numerosd === numerosd);
    if (consultaEncontrada) {
      const doc: any = new jsPDF();
      // Agregar imagen del logo
      const img = new Image();
      img.src = 'assets/dist/img/imguniajc.jpg'; // Ruta de la imagen
      const imgWidth = 50; // Ancho de la imagen
      const imgHeight = 50; // Altura de la imagen
      const pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth(); // Ancho de la página
      const pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight(); // Altura de la página
      const positionX = (pageWidth - imgWidth) / 2; // Posición X para centrar la imagen horizontalmente
      const positionY = 20; // Posición Y para la imagen
      doc.addImage(img, 'PNG', positionX, positionY, imgWidth, imgHeight); // Agregar imagen centrada en la parte superior del documento

      // Crear tabla con los datos de la consulta encontrada
      const tableData = [
        ['Número de trámite', 'Nombre del solicitante', 'Jornada', 'Carrera', 'Tipo de solicitud', 'Fecha', 'Respuesta', 'Estado'],
        [consultaEncontrada.tramitesEntity.numerosd, consultaEncontrada.tramitesEntity.nombre, consultaEncontrada.tramitesEntity.jornada, consultaEncontrada.tramitesEntity.carrera, consultaEncontrada.tramitesEntity.tiposol, consultaEncontrada.tramitesEntity.fecha, consultaEncontrada.Respuesta, consultaEncontrada.estado]
      ];

      doc.setFont('Times', 'Roman');
      doc.text('Datos de la consulta', 14, img.width + 15);

      const startY = positionY + imgHeight + 20;
      doc.autoTable({
        startY: startY,
        head: [tableData[0]],
        body: tableData.slice(1),
        theme: 'grid',
        pageBreak: 'auto',
        margin: { top: startY }
      });

      doc.save(`consulta_${consultaEncontrada.tramitesEntity.numerosd}.pdf`);
    } else {
      this.toastr.warning('No se encontró ninguna consulta con ese número de trámite');
    }
  } else {
    this.toastr.warning('Por favor, ingrese un número de trámite');
  }
}






  buscarTimeline(): void {
    const numerosd = $('#numerosd').val();
    const consultaEncontrada = this.consultas.find(consulta => consulta.tramitesEntity.numerosd === numerosd);
    if (consultaEncontrada) {
      const items = [
        {
          id: 1,
          content: `<div class="timeline-header">
                        <span class="timeline-time">${new Date(consultaEncontrada.tramitesEntity.fecha).toLocaleString()}</span>
                        <h3 class="timeline-title">Consulta creada</h3>
                    </div>
                    <div class="timeline-body">
                        <p>El usuario ${consultaEncontrada.tramitesEntity.nombre} creó la consulta.</p>
                    </div>`,
          start: new Date(consultaEncontrada.tramitesEntity.fecha)
        },
        {
          id: 2,
          content: `<div class="timeline-header">
                        <span class="timeline-time">${new Date(consultaEncontrada.Respuesta).toLocaleString()}</span>
                        <h3 class="timeline-title">Consulta resuelta</h3>
                    </div>
                    <div class="timeline-body">
                        <p>El administrador respondió a la consulta con el siguiente mensaje: "${consultaEncontrada.Respuesta}".</p>
                    </div>`,
          start: new Date(consultaEncontrada.Respuesta)
        }
      ];

      // Configuración del timeline
      const options = {
        orientation: 'top',
        minHeight: '500px'
      };

      const icon1 = document.getElementById('icon-1');
      icon1.addEventListener('click', function() {
      alert('Tu tramite esta siendo procesado');
      });


      // Crear el timeline en el contenedor
      const timeline = new vis.Timeline(document.getElementById('timeline-container'), items, options);
    } else {
      this.toastr.warning('No se encontró ninguna consulta con ese número de trámite');
    }
  }

}



