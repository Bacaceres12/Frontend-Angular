import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { TokenService } from './../../services/token.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {
  nombreUsuario: string;
  menuItems: any[];
  isAdmin: boolean;
  isDirector: boolean;

  constructor(private sidebarService: SidebarService, private router: Router, private tokenService: TokenService) {
    this.isAdmin = tokenService.isAdmin();
    this.isDirector = tokenService.isDirector();
    this.menuItems = sidebarService.getMenu(this.isAdmin, this.isDirector);
    this.nombreUsuario = this.tokenService.getNombreUsuario();

  }

  ngOnInit(): void {
  
  }

  logOut(): void {
    localStorage.removeItem('usuarioId');
    localStorage.removeItem('nombreUsuario');
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

}
