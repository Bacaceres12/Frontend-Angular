import { NotificationService } from 'src/app/services/notification.service';
import { LoginUsuarioDto } from './../../models/login-usuario.dto';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from './../../services/token.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: LoginUsuarioDto = null;

  nombreUsuario: string;
  correo: string;
  password: string;

  recordarUsuario: boolean = false;
  recordarContrasena: boolean = false;

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private toastrService: ToastrService,
    private router: Router,
    private notificationService: NotificationService

  ) { }

  ngOnInit(): void {
    // Recuperar valores del almacenamiento local (localStorage) si están disponibles
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      this.nombreUsuario = parsedUser.nombreUsuario;
      this.recordarUsuario = true;
    }

    const savedPassword = localStorage.getItem('password');
    if (savedPassword) {
      const parsedPassword = JSON.parse(savedPassword);
      this.password = parsedPassword.password;
      this.recordarContrasena = true;
    }



  }

   onLogin(): void {
    this.usuario = new LoginUsuarioDto(this.nombreUsuario, this.password, this.correo,);
    this.authService.login(this.usuario).subscribe(
      data => {
        if (!data.token) {
          this.toastrService.error(data.response.message, 'Fail', {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
        } else {
          this.tokenService.setToken(data.token);
          if (this.recordarUsuario) {
            // Guardar valores en el almacenamiento local
            localStorage.setItem('user', JSON.stringify({ nombreUsuario: this.nombreUsuario }));
          } else {
            // Eliminar valores del almacenamiento local
            localStorage.removeItem('user');
          }

          if (this.recordarContrasena) {
            // Guardar valores en el almacenamiento local
            localStorage.setItem('password', JSON.stringify({ password: this.password }));
          } else {
            // Eliminar valores del almacenamiento local
            localStorage.removeItem('password');
          }
          this.notificationService.sendNotification('El estado del trámite ha sido actualizado.');
          // Si existe una última consulta, mostrar el mensaje de notificación


          this.router.navigateByUrl('/');
        }
      },
      err => {
        this.toastrService.error(err.error.message, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    );
  }

}


