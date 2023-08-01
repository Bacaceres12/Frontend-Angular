import { Asignatura } from "./asignatura";
import { Usuario } from "./usuario";

export interface Asignacion {
  id: number;
  usuario: Usuario;
  asignatura: Asignatura;
  fecha: Date;
  semestre: number;
  nombreAsignatura: string;
}
