import { Tramites } from "./tramites";

export class Consulta{
  idUsuario(idUsuario: any) {
    throw new Error('Method not implemented.');
  }



  idConsulta?: number;
  estado: string;
  Respuesta: string;
  fechaConsulta: Date;
  tramitesEntity: Tramites;
  consultaEntity: Consulta;
  constructor(fechaConsulta:Date){


    this.fechaConsulta=fechaConsulta;
  }





}
