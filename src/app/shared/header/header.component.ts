import { TokenService } from 'src/app/services/token.service';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { ToastrService } from 'ngx-toastr';
import { TemaService } from 'src/app/services/tema.service';
import { Consulta } from 'src/app/models/consulta';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  nombreUsuario: string;

  notifications: any[] = []; // Nueva variable de tipo arreglo para guardar las notificaciones
  notificationCount = 0;
  temaActual: string;

  constructor(
     private notificationService: NotificationService,
     private toastr: ToastrService,
     private temaService: TemaService,
     public tokenService: TokenService
    ) { }

    ngOnInit(): void {
      // Suscribirse a la propiedad consultaActualizada$
      this.notificationService.consultaActualizada$.subscribe((notification: any) => {
        this.notificationCount++;
        this.addNotification(notification);
        this.toastr.info(`La consulta "${notification.estado}" ha sido actualizada por el Director.`);
        this.nombreUsuario = this.tokenService.getNombreUsuario();
      });
    }

    logOut(): void {
      this.tokenService.logOut();
    }

    addNotification(notification: any) {
      this.notifications.push(notification); // Agregar la notificación a la nueva variable de tipo arreglo
    }


}
