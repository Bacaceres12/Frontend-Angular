import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Consulta } from 'src/app/models/consulta';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import { ConsultasService } from 'src/app/services/consultas.service';
import esLocale from '@fullcalendar/core/locales/es';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarTemplateRef } from '@fullcalendar/angular/private-types';


@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {

  @ViewChild('eventoModal', { static: false }) eventoModal: CalendarTemplateRef<any>;

  consultas: Consulta[];
  eventoSeleccionado: any
  nuevoEvento: any = {};

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin],
    eventDidMount: this.customEventDidMount.bind(this), // Llama a la función personalizada
    eventClick: this.abrirModalEvento.bind(this),
    locale: esLocale,
    initialView: 'timeGridWeek',
    events: [
    ],

    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },


    slotLabelFormat: 'HH:mm',
    eventTimeFormat: {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: 'America/Bogota'
    },
    views: {
      timeGrid: {
        columnHeaderFormat: { weekday: 'short', day: 'numeric', month: 'short' },
        slotEventOverlap: false,
        slotDuration: '00:15',
        slotLabelInterval: { minutes: 15 },
        slotLabelFormat: {
          hour: 'numeric',
          minute: '2-digit',
          meridiem: true,
          hour12: false
        },
        allDaySlot: false,
        scrollTime: '08:00:00',
        minTime: '00:00:00',
        maxTime: '24:00:00'
      }
    }
  };

  constructor(
    private consultasService: ConsultasService,
    private modalService: NgbModal

    ) { }

  ngOnInit(): void {
    this.consultasService.listaConsulta().subscribe(consultas => {
      this.consultas = consultas;

      // Creamos los eventos para las consultas obtenidas del servicio
      const eventosConsultas = this.consultas.map(consulta => {
        return {
          title: `Consulta ${consulta.tramitesEntity.nombre}`,
          start: new Date(consulta.tramitesEntity.fecha),
          end: new Date(consulta.Respuesta),
          color: 'blue',
          classNames: ['fc-event-team'],
          display: 'block',
          extendedProps: {
            descripcion: `Solicitud: ${consulta.tramitesEntity.tiposol}\nEstado: ${consulta.estado}`,
          }
        };
      });

      // Combina los eventos predefinidos con los eventos de las consultas manualmente
      this.calendarOptions.events = [];
      this.calendarOptions.events.push(...this.getEventosPredefinidos());
      this.calendarOptions.events.push(...eventosConsultas);
    });
  }

  getEventosPredefinidos(): any[] {
    return [
      {
        title: 'Adicionar Asignaturas',
        start: '2023-08-15',
        color: 'green',
        classNames: ['fc-event-academico'],
        display: 'block',
        extendedProps: {
          descripcion: 'Este proceso lo puedes realizar hasta el 26 Agosto – Debes acercarte a tu Facultad para que a través de la dirección de programa académico puedan adicionarte las asignaturas.'
        }
      },
      {
        title: 'Cancelación de asignatura',
        start: '2023-08-30',
        color: 'green',
        classNames: ['fc-event-academico'],
        display: 'block',
        extendedProps: {
          descripcion: 'El proceso lo puedes realizar hasta el 9 Septiembre a través de la plataforma Uniajcsgit'
        }
      },
      // Agregar más eventos académicos aquí
    ];
  }


  abrirModalEvento(info: any) {
    const title = info.event.title;
    const descripcion = info.event.extendedProps.descripcion;

    this.eventoSeleccionado = { title, extendedProps: { descripcion } };

    const modalRef = this.modalService.open(this.eventoModal, { centered: true, backdrop: false });
  }



  private customEventDidMount(info: any) {
    const eventElement = info.el;
    const popoverContent = `
      <div class="fc-event-popover">
        <div class="fc-event-time">${info.timeText}</div>
        <div class="fc-description">
          ${info.event.extendedProps.descripcion}<br>
        </div>
        <div class="fc-event-title">${info.event.title}</div>
      </div>
    `;
    const popoverElement = document.createElement('div');
    popoverElement.innerHTML = popoverContent;

    eventElement.classList.add('fc-has-popover');

    eventElement.addEventListener('mouseenter', () => {
      eventElement.appendChild(popoverElement);
    });

    eventElement.addEventListener('mouseleave', () => {
      eventElement.removeChild(popoverElement);
    });
  }

  
}
