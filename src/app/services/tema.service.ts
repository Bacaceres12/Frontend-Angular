import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemaService {

  private activeTheme = 'default';
  private navbarColor = 'navbar-dark';

  constructor() { }

  getActiveTheme() {
    return this.activeTheme;
  }

  setActiveTheme(theme: string) {
    this.activeTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
  }

  getNavbarColor() {
    return this.navbarColor;
  }

  setNavbarColor(color: string) {
    this.navbarColor = color;
    document.querySelector('.navbar').classList.remove('navbar-dark', 'navbar-light');
    document.querySelector('.navbar').classList.add(color);
  }
}
