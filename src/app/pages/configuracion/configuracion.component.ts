import { Component, HostBinding } from '@angular/core';
import { TemaService } from './../../services/tema.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent {

  activeTheme: string;
  navbarColor: string = 'bg-primary';
  backgroundClass: string = '';
  isDarkMode = false;

  constructor(private temaService: TemaService

    ) { }

    ngOnInit() {
      this.activeTheme = this.temaService.getActiveTheme();
    }

    setTheme(theme: string) {
      this.activeTheme = theme;
      this.temaService.setActiveTheme(theme);

      // Cambiar clase de fondo si se cambia al tema oscuro
      if (theme === 'light') {
        this.backgroundClass = 'bg-dark';
      } else {
        this.backgroundClass = '';
      }
    }

     cambiarColorNavbar(color: string) {
    // elimina la clase del color actual y añade la clase del nuevo color
    document.querySelector('.navbar').classList.remove(this.navbarColor);
    document.querySelector('.navbar').classList.add(color);
    this.navbarColor = color;
  }

  cambiarSidebarVariante(variante: string) {
    // remueve la clase actual y agrega la nueva clase correspondiente
    document.querySelector('.main-sidebar').classList.remove('sidebar-dark', 'sidebar-light', 'sidebar-dark-green', 'sidebar-red', 'sidebar-light-blue');
    document.querySelector('.main-sidebar').classList.add(`sidebar-${variante}`);
  }


  @HostBinding('class') get themeMode() {
    return this.isDarkMode ? 'dark-mode' : '';
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
  }
  
  }
