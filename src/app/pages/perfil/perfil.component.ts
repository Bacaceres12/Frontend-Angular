import { UsuariosService } from 'src/app/services/usuarios.service';
import { Component } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
  public tokenService: TokenService;
  nombreUsuario: string;
  public rolUsuario: string;
  public usuariosService: UsuariosService;
  selectedFile: File;

  imagenUsuario: string = './assets/dist/img/user4-128x128.jpg'; // Ruta de la imagen actual

  constructor(tokenService: TokenService, usuariosService: UsuariosService) {
    this.tokenService = tokenService;
    this.usuariosService = usuariosService;
  }

  ngOnInit(): void {
    this.nombreUsuario = this.tokenService.getNombreUsuario();
    this.rolUsuario = this.getRolUsuario();

  }

  getRolUsuario(): string {
    if (this.tokenService.isAdmin()) {
      return 'Admin';
    } else if (this.tokenService.isDirector()) {
      return 'Director';
    } else {
      return 'Estudiante';
    }
  }

  onFileSelected(event: Event): void {
    const inputElement: HTMLInputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
    }
  }


  uploadPhoto(): void {
    const formData = new FormData();
    formData.append('foto', this.selectedFile);

    const id = 118; // Reemplaza con el ID del usuario al que deseas cargar la foto

    this.usuariosService.uploadPhoto(id, formData).subscribe(
      (response) => {
        // La foto se ha cargado correctamente
        console.log('Foto cargada exitosamente', response);
      },
      (error) => {
        // Ocurrió un error al cargar la foto
        console.error('Error al cargar la foto', error);
      }
    );
  }

}
