export class LoginUsuarioDto{

  nombreUsuario: string;
  correo: string;
  password: string;

   constructor(nombreUsuario: string, password: string, correo: string){
      this.nombreUsuario = nombreUsuario;
      this.password = password;
      this.correo = correo;
   }
  }

