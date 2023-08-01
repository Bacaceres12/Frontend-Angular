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
  fecha: Date = null;
  consultaEntity: Consulta;
  consultas: Consulta[];
  fechaConsulta: Date;

  constructor(cc:number, nombre:string, jornada:string, carrera:string, numerosd:string,tiposol:string, fecha: Date, fechaConsulta: Date){


    this.cc=cc;
    this.nombre=nombre;
    this.jornada=jornada;
    this.numerosd=numerosd;
    this.carrera=carrera;
    this.tiposol=tiposol;
    this.fecha=fecha;
    this.fechaConsulta=fechaConsulta

  }

  }

