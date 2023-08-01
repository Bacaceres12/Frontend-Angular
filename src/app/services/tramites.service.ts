import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Tramites } from '../models/tramites';

@Injectable({
  providedIn: 'root'
})
export class TramitesService {

  tramitesURL= environment.tramitesURL;

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Tramites[]> {
    return this.httpClient.get<Tramites[]>(`${this.tramitesURL}`);
  }

  public detail(idSolicitud: number): Observable<Tramites> {
    return this.httpClient.get<Tramites>(`${this.tramitesURL}${idSolicitud}`);
  }

  public save(tramites: Tramites): Observable<any> {
    return this.httpClient.post<any>(`${this.tramitesURL}`, tramites);
  }

  public update(idSolicitud: number, tramites: Tramites): Observable<any> {
    return this.httpClient.put<any>(`${this.tramitesURL}${idSolicitud}`, tramites);
  }

  public delete(idSolicitud: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.tramitesURL}${idSolicitud}`);
  }
}
