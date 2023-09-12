import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Consulta } from '../models/consulta';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notificationSubject = new Subject<string>();
  private notifications: string[] = []; // Agrega esta lista
  private userTramiteNotifications: { [userId: number]: { [tramiteId: number]: Notification[] } } = {};


  constructor() {}

  sendNotification(message: string) {
    console.log('Sending notification:', message);
    this.notificationSubject.next(message);
    this.notifications.push(message); // Almacena la notificación en la lista

  }



  getNotificationObservable() {
    return this.notificationSubject.asObservable();
  }

  getNotifications(): string[] {
    return this.notifications;
  }
}
