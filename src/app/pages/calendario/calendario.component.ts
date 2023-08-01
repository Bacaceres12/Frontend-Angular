import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Consulta } from 'src/app/models/consulta';
import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import { ConsultasService } from 'src/app/services/consultas.service';
import esLocale from '@fullcalendar/core/locales/es';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {

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

  constructor(private consultasService: ConsultasService) { }

  ngOnInit(): void {
    this.consultasService.listaConsulta().subscribe(consultas => {
      this.consultas = consultas;

      // Creamos los eventos para el calendario
      const eventos = this.consultas.map(consulta => {
        return {
          title: `Consulta ${consulta.tramitesEntity.nombre}`,
          start: new Date(consulta.tramitesEntity.fecha),
          end: new Date(consulta.Respuesta),
          color: 'blue',
          classNames: ['fc-event-team'],
          display: 'block',
          extendedProps: {
            descripcion: consulta.estado
          }
        };
      });

      this.calendarOptions.events = eventos;
    });
  }

}
