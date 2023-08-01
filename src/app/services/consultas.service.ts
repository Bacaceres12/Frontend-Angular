import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Consulta } from '../models/consulta';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultasService {

  consultaURL= environment.consultaURL;
  consultaTodasURL=environment.consultaTodasURL;

  constructor(private httpClient: HttpClient) { }

  public listaConsulta(): Observable<Consulta[]> {
    return this.httpClient.get<Consulta[]>(`${this.consultaURL}`);
  }

  public listaConsultaTodas(): Observable<Consulta[]> {
    return this.httpClient.get<Consulta[]>(this.consultaTodasURL);
  }

  public updateConsulta(consultaId: number, consulta: Consulta): Observable<void> {
    return this.httpClient.put<void>(`${this.consultaURL}${consultaId}`, consulta);
  }

}
