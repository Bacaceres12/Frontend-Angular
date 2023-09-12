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

    ngOnInit() {
      // Solo los usuarios normales deberían recibir notificaciones
      if (this.tokenService.isUser()) {
        this.notifications = this.notificationService.getNotifications();
        this.notificationCount = this.notifications.length;
        // Escucha las nuevas notificaciones
        this.notificationService.getNotificationObservable().subscribe(message => {
          // Agrega la notificación a la lista y actualiza el contador
          this.notifications.push(message);
          this.notificationCount++;

        });

      }

    }



    logOut(): void {
      this.tokenService.logOut();
    }
}
