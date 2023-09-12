import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Consulta } from 'src/app/models/consulta';
import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { ConsultasService } from 'src/app/services/consultas.service';
import esLocale from '@fullcalendar/core/locales/es';

@Component({
  selector: 'app-calendario-d',
  templateUrl: './calendario-d.component.html',
  styleUrls: ['./calendario-d.component.css']
})
export class CalendarioDComponent implements OnInit {

  consultas: Consulta[];

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin],
    locale: esLocale,
    initialView: 'timeGridWeek',
    events: [],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },

    eventContent: function(info) {
      return {
        html: `<div class="fc-event-note">
                  <div class="fc-event-time">${info.timeText}</div>
                  <div class="fc-description">${info.event.extendedProps.descripcion}</div>
                  <div class="fc-event-title">${info.event.title}</div>
              </div>`,
        classList: ['fc-event-note']
      };
    },

    slotLabelFormat: 'HH:mm',
    eventTimeFormat: {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: 'America/Bogota'
    },
    views: {

      dayGridMonth: {
        dayMaxEventRows: 5, // Cambia este valor según tus necesidades
      },
      timeGrid: {
        columnHeaderFormat: { weekday: 'short', day: 'numeric', month: 'short' },
        slotEventOverlap: false,
        slotDuration: '00:15',
        slotLabelInterval: { minutes: 30 },
        slotLabelFormat: {
          hour: 'numeric',
          minute: '2-digit',
          meridiem: true,
          hour12: false
        },
        allDaySlot: false,
      }
    }
  };

  constructor(private consultasService: ConsultasService) { }

  ngOnInit(): void {
    this.consultasService.listaConsultaTodas().subscribe(consultas => {
      this.consultas = consultas;


    // Filtrar las consultas realizadas
    const consultasRealizadas = this.consultas.filter(consulta => consulta.estado === 'Realizada');

       // Obtener la hora actual en tiempo real
       const horaActual = new Date();

      // Creamos los eventos para el calendario
      const eventos = this.consultas.map(consulta => {
        const fechaInicio = new Date(horaActual);
        const fechaFin = new Date(horaActual);

        // Ajustar la hora de inicio y fin utilizando la hora actual
        fechaInicio.setFullYear(horaActual.getFullYear());
        fechaInicio.setMonth(horaActual.getMonth());
        fechaInicio.setDate(horaActual.getDate());

        fechaFin.setFullYear(horaActual.getFullYear());
        fechaFin.setMonth(horaActual.getMonth());
        fechaFin.setDate(horaActual.getDate());

 // Incluir el tipo de solicitud en la descripción
 const descripcion = `Solicitud: ${consulta.tramitesEntity.tiposol}\nEstado: ${consulta.estado}`;

        return {
          title: `Consulta ${consulta.tramitesEntity.nombre}`,
           start: fechaInicio,
           end: fechaFin,
          color: 'blue',
          classNames: ['fc-event-team'],
          display: 'block',
          extendedProps: {
            descripcion: descripcion
          }
        };
      });

      this.calendarOptions.events = eventos;
    });
  }

}

