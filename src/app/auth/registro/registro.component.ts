import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../services/auth.service';
import { NuevoUsuarioDto } from './../../models/nuevo-usuario.dto';
import { Component, OnInit } from '@angular/core';
import { SocialAuthService, GoogleLoginProvider, MicrosoftLoginProvider, SocialUser } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})

export class RegistroComponent implements OnInit {

  usuario: NuevoUsuarioDto = null;

    nombre: string;
    nombreUsuario: string;
    correo: string;
    tel: string;
    jornada: string;
    programa: string;
    password: string;
    termsAccepted: boolean = false;

  constructor(
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router,
    public socialAuthService: SocialAuthService

  ) { }

  ngOnInit(): void {
  }

  onRegister(): void {
    this.usuario = new NuevoUsuarioDto(this.nombre, this.nombreUsuario, this.correo, this.tel, this.jornada, this.programa, this.password);
    this.authService.registro(this.usuario).subscribe(
      data => {
        this.toastrService.success(data.message, 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
        this.router.navigate(['/login']);
      },
      err => {
        this.toastrService.error(err.error.message, 'Error', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    );
  }

  acceptTerms() {
    this.termsAccepted = true;
  }


  signInWithGoogle(event: any): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((user: SocialUser) => {
      // Se ha iniciado sesión con éxito con Google. Aquí se puede manejar la respuesta.
      console.log(user);
    }).catch(error => {
      // Ocurrió un error al iniciar sesión con Google. Aquí se puede manejar el error.
      console.error(error);
    });
  }


  onOutlookLogin(): void {
    this.socialAuthService.signIn('MICROSOFT').then(
      data => {
        console.log(data);
        // Aquí deberás enviar los datos del usuario a tu backend para autenticarlo
      },
      err => {
        console.error(err);
      }
    );
  }
}
