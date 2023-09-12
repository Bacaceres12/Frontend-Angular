import { Asignatura } from './asignatura';
import { Consulta } from 'src/app/models/consulta';
export class Tramites{


  idSolicitud?: number;
  cc: number;
  nombre: string;
  jornada: string;
  numerosd: string;
  carrera: string;
  tiposol: string;
  asignatura:string;
  motivo:string;
  semestre:string;
  fecha: Date = null;
  consultaEntity: Consulta;
  consultas: Consulta[];
  fechaConsulta: Date;

  constructor(cc:number, nombre:string, jornada:string, carrera:string, numerosd:string,tiposol:string, fecha: Date, fechaConsulta: Date, asignatura:string, motivo:string, semestre:string){


    this.cc=cc;
    this.nombre=nombre;
    this.jornada=jornada;
    this.numerosd=numerosd;
    this.carrera=carrera;
    this.tiposol=tiposol;
    this.fecha=fecha;
    this.fechaConsulta=fechaConsulta;
    this.asignatura=asignatura;
    this.motivo=motivo;
    this.semestre=semestre;

  }

  }

