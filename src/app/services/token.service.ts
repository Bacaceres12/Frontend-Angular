import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { Subject } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class TokenService {



  constructor() { }

  isLogged(): boolean {
    if (this.getToken()) {
      return true;
    }
    return false;
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  getNombreUsuario(): string {
    if (!this.isLogged()) {
      return null;
    }
    const token = this.getToken();
    const payload = token.split('.')[1];
    const values = atob(payload);
    const valuesJson = JSON.parse(values);
    const nombreUsuario = valuesJson.nombreUsuario;
    return nombreUsuario;
  }


  isAdmin(): boolean {
    if (!this.isLogged()) {
      return null;
    }
    const token = this.getToken();
    const payload = token.split('.')[1];
    const values = atob(payload);
    const valuesJson = JSON.parse(values);
    const roles = valuesJson.roles;
    console.log(roles);
    if (roles.indexOf('admin') < 0) {
      return false;
    }
    return true;
  }


  isDirector(): boolean {
    if (!this.isLogged()) {
      return false;
    }
    const token = this.getToken();
    const payload = token.split('.')[1];
    const values = atob(payload);
    const valuesJson = JSON.parse(values);
    const roles = valuesJson.roles;
    if (roles.indexOf('director') < 0) {
      return false;
    }
    return true;
  }

  isUser(): boolean {
    if (!this.isLogged()) {
      return false;
    }
    const token = this.getToken();
    const payload = token.split('.')[1];
    const values = atob(payload);
    const valuesJson = JSON.parse(values);
    const roles = valuesJson.roles;
    if (roles.indexOf('user') < 0) {
      return false;
    }
    return true;
  }


  getIdUsuario(): number {
    const token = this.getToken();
    if (token) {
      const decoded: any = jwt_decode(token);
      const userId = decoded.id; // Cambia "id" por la propiedad adecuada que contiene el ID de usuario en tu token
      console.log('ID de usuario:', userId);
      return userId;
    }
    return null;
  }


  logOut(): void {
    localStorage.clear();
  }
}
