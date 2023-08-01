export class NuevoUsuarioDto{
 
nombre: string;
nombreUsuario: string;
correo: string;
tel: string;
jornada: string;
programa: string;
password: string;

     constructor(nombre: string, nombreUsuario: string, correo: string, tel: string, jornada: string, programa: string, password: string){
        this.nombre = nombre;
        this.nombreUsuario = nombreUsuario;
        this.correo = correo;
        this.tel = tel;
        this.jornada = jornada;
        this.programa = programa;
        this.password = password;
     }
    }
    
    