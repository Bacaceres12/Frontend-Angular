import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { BeadcrumbsComponent } from './beadcrumbs/beadcrumbs.component';
import { interceptorProvider } from '../interceptors/tramites.interceptor';
import {HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations:[
  HeaderComponent,
  SidebarComponent,
  FooterComponent,
  BeadcrumbsComponent
],

exports:[
  HeaderComponent,
  SidebarComponent,
  FooterComponent,
  BeadcrumbsComponent
],

  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
  ],

  providers: [interceptorProvider]
})
export class SharedModule { }
