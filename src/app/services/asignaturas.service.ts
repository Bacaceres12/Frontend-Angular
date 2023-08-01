import { Asignatura } from './../models/asignatura';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AsignaturasService {

   asignaturaURL= environment.asignaturaURL;

   constructor(private http: HttpClient) { }

   crearAsignatura(nombre: string, semestre: number, horario: string, descripcion: string, creditos: number): Observable<Asignatura> {
    const asignatura = { nombre, semestre, horario, descripcion, creditos };
    return this.http.post<Asignatura>(this.asignaturaURL, asignatura);
  }



   actualizarAsignatura(id: number, nombre: string): Observable<Asignatura> {
     const url = `${this.asignaturaURL}${id}`;
     return this.http.put<Asignatura>(url, { nombre });
   }

   eliminarAsignatura(id: number): Observable<any> {
     const url = `${this.asignaturaURL}${id}`;
     return this.http.delete(url);
   }

   obtenerTodasLasAsignaturas(): Observable<Asignatura[]> {
     return this.http.get<Asignatura[]>(this.asignaturaURL);
   }

 }

