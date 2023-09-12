import { Rol } from './rol';
export class Usuario{

  id?: number;
  nombre: string;
  correo: string;
  tel: string;
  jornada: string;
  programa: string;
  password: string;
  roles?: Rol[];
  
       constructor(nombre: string, correo: string, tel: string, jornada: string, programa: string,   password: string
        ){
          this.nombre = nombre;
          this.correo = correo;
          this.tel = tel;
          this.jornada = jornada;
          this.programa = programa;
          this.password = password;
       }

      }

