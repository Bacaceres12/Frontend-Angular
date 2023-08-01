import { TramitesService } from './../../services/tramites.service';
import { TokenService } from './../../services/token.service';
import { Component, OnInit } from '@angular/core';
import { Tramites } from 'src/app/models/tramites';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  nombreUsuario: string;
  tramite:Tramites[]= [];



  constructor(
    public TokenService: TokenService,
    private tramitesService: TramitesService

  ){}

  ngOnInit(): void {
    this.nombreUsuario = this.TokenService.getNombreUsuario();

  }
}



