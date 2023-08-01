import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  correo: string;

  constructor(private authService: AuthService, private toastrService: ToastrService) {}

  onRecuperarContrasena(): void {
    this.authService.recuperarContrasena(this.correo).subscribe(
      data => {
        this.toastrService.success(data.message, 'Éxito', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      },
      err => {
        this.toastrService.error(err.error.message, 'Fail', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      }
    );
  }
}
