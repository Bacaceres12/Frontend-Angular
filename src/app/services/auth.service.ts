import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { LoginUsuarioDto } from '../models/login-usuario.dto';
import { NuevoUsuarioDto } from '../models/nuevo-usuario.dto';
import { TokenDto } from '../models/token.dto';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL= environment.authURL;

  constructor(private HttpClient: HttpClient,  private router: Router, private toastr: ToastrService) { }

  login(dto: LoginUsuarioDto): Observable<any>{
    return this.HttpClient.post<any>(this.authURL + 'login', dto);
  }

  registro (dto: NuevoUsuarioDto): Observable<any>{
    return this.HttpClient.post<any>(this.authURL + 'nuevo', dto);
  }

  refresh(dto: TokenDto): Observable<any>{
    return this.HttpClient.post<any>(this.authURL + 'refresh', dto);
  }

  recuperarContrasena(correo: string): Observable<any> {
    const url = this.authURL + 'recuperar-contrasena';
    const body = { correo };
    return this.HttpClient.post(url, body);
  }

  actualizarContrasena(token: string, nuevaContrasena: string): Observable<any> {
    const url = this.authURL + `actualizar-contrasena/${token}`;
    const body = { nuevaContrasena };
    return this.HttpClient.post(url, body);
  }


}
