import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Consulta } from '../models/consulta';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notificationCount = 0;
  private notificationCountSource = new Subject<number>();
  private consultaActualizadaSource = new Subject<Consulta>();
  private ultimaConsultaActualizada: Consulta; // Nueva propiedad
  consultaActualizada$ = this.consultaActualizadaSource.asObservable()
  notificationCount$ = this.notificationCountSource.asObservable();

  constructor() { }

  actualizarConsulta(consulta: Consulta) {
    // Aquí iría la lógica para actualizar la consulta

    // Emitimos la notificación al menú
    this.notificationCount++;
    this.notificationCountSource.next(this.notificationCount);

    // Almacenamos la última consulta actualizada
    this.ultimaConsultaActualizada = consulta;

    // Emitimos la consulta actualizada
    this.consultaActualizadaSource.next(consulta);


  }

  obtenerUltimaConsultaActualizada(): Consulta {
    return this.ultimaConsultaActualizada;
  }

  enviarNotificacion(consulta: Consulta) {
    this.consultaActualizadaSource.next(consulta);
  }

}
