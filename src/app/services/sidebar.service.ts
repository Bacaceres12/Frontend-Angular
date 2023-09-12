import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  adminMenu: any[] = [
    {
      titulo: 'Admin',
      icono: 'nav-icon fas fa-cogs',
      submenu: [
        { titulo: 'Usuarios', url: 'usuario', icono: 'fas fa-user' },
        { titulo: 'Configuración', url: 'configuracion', icono: 'fas fa-cogs' },
        { titulo: 'Estadísticas', url: 'estadisticas', icono: 'fas fa-chart-bar' },
        { titulo: 'Calendario', url: 'calendario', icono: 'fas fa-calendar' },
      ]
    }
  ];


  directorMenu: any[] = [
    {
      titulo: 'Dashboard',
      icono: 'nav-icon fas fa-tachometer-alt',
      submenu: [
        { titulo: 'Solicitudes', url: 'consultas-d', icono: 'fas fa-edit'},
        { titulo: 'Estudiantes', url: 'versolicitud', icono: 'fas fa-user-graduate' },
        {titulo: 'Estadísticas', url: 'estadisticas',  icono: 'fas fa-chart-bar'},
        { titulo: 'Asignación', url: 'asignaturas', icono: 'fas fa-book' },
        { titulo: 'Calendario', url: 'calendario-d', icono: 'fas fa-calendar-alt' },
      ]
    },

    {
      titulo: 'Configuración',
      icono: 'nav-icon fas fa-cogs',
      submenu: [
        {titulo: 'plantilla', url: 'configuracion', icono: 'nav-icon fas fa-cogs'},
      ]
    }
  ];


  userMenu: any[] = [
    {
      titulo: 'Dashboard',
      icono: 'nav-icon fas fa-tachometer-alt',
      submenu: [
        { titulo: 'Realizar solicitudes', url: 'tramites', icono: 'fas fa-pencil-alt' },
        { titulo: 'Información de trámites', url: 'consultatramites', icono: 'fas fa-clipboard-list' },
        { titulo: 'Consultas', url: 'consultas', icono: 'fas fa-search' },
        { titulo: 'Asignar asignaturas', url: 'asignacion', icono: 'fas fa-graduation-cap' },
        { titulo: 'Mis Asignaturas', url: 'semestre', icono: 'fas fa-book' },
        { titulo: 'Configuración', url: 'configuracion', icono: 'fas fa-cogs' },
        { titulo: 'Calendario', url: 'calendario', icono: 'fas fa-calendar-alt' },
      ]
    }
  ];


  constructor() { }

  getMenu(isAdmin: boolean, isDirector: boolean): any[] {
    if (isDirector) {
      return this.directorMenu;
    }
    return isAdmin ? this.adminMenu : this.userMenu;
  }
}
