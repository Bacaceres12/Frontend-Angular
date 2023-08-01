import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Asignacion } from '../models/asignacion';

@Injectable({
  providedIn: 'root'
})
export class AsignacionService {

  asignacionURL= environment.asignacionURL;

  constructor(private http: HttpClient) { }

  asignar(asignaturaId: number, semestre: number): Observable<any> {
    const url = `${this.asignacionURL}`;
    const body = {
      asignaturaId: asignaturaId,
      semestre: semestre
    };
    return this.http.post<any>(url, body);
  }


  verAsignaciones(): Observable<Asignacion[]> {
    const url = `${this.asignacionURL}`;
    return this.http.get<Asignacion[]>(url);
  }

}
