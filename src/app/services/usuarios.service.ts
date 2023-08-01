import { Usuario } from './../models/usuario';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Rol } from '../models/rol';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  usuarioURL= environment.usuarioURL;
  private rolURL= environment.rolURL;

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(this.usuarioURL);
  }

  public update(usuario: Usuario): Observable<any> {
    return this.httpClient.put<any>(`${this.usuarioURL}${usuario.id}`, usuario);
  }
    asignarRoles(usuarioId: number, roles: string[]): Observable<any> {
    const body = { roles };
    return this.httpClient.put(`${this.usuarioURL}${usuarioId}/roles`, body);
}
  public getall(): Observable<Rol[]> {
    return this.httpClient.get<Rol[]>(`${this.rolURL}`);
  }

  uploadPhoto(id: number, formData: FormData): Observable<any> {
    const url = `${this.usuarioURL}${id}/foto`; // Asegúrate de eliminar el duplicado "/usuario" en la URL
    return this.httpClient.post(url, formData);
  }


}

