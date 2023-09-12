import { PagesComponent } from './pages.component';
import { interceptorProvider } from './../interceptors/tramites.interceptor';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { ConsultasComponent } from './consultas/consultas.component';
import { TramitesComponent } from './tramites/tramites.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CalendarioComponent } from './calendario/calendario.component';
import { VerSolicitudComponent } from './ver-solicitud/ver-solicitud.component';
import { EditarSolicitudComponent } from './editar-solicitud/editar-solicitud.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { MenuComponent } from './menu/menu.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ConsultaTramitesComponent } from './tramites/consulta-tramites/consulta-tramites.component';
import { NgbModule, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { AsignaturasComponent } from './asignaturas/asignaturas.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { AsignacionComponent } from './asignacion/asignacion.component';
import { SemestreComponent } from './semestre/semestre.component';
import { PerfilComponent } from './perfil/perfil.component';
import { BsDatepickerModule, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
import { CalendarioDComponent } from './calendario-d/calendario-d.component';
import { ConsultasDComponent } from './consultas-d/consultas-d.component'
import { SlickCarouselModule } from 'ngx-slick-carousel';

defineLocale('es', esLocale);

@NgModule({
  declarations: [
    DashboardComponent,
    TramitesComponent,
    ConsultasComponent,
    PagesComponent,
    CalendarioComponent,
    VerSolicitudComponent,
    EditarSolicitudComponent,
    UsuarioComponent,
    MenuComponent,
    ConsultaTramitesComponent,
    AsignaturasComponent,
    ConfiguracionComponent,
    EstadisticasComponent,
    AsignacionComponent,
    SemestreComponent,
    PerfilComponent,
    CalendarioDComponent,
    ConsultasDComponent
  ],

    exports:[
      DashboardComponent,
      TramitesComponent,
      ConsultasComponent,
      PagesComponent,
      CalendarioComponent,
      VerSolicitudComponent,
      EditarSolicitudComponent,
      UsuarioComponent,
      ConfiguracionComponent,
      EstadisticasComponent


    ],

  imports: [
    CommonModule,
    SharedModule,
    DataTablesModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    SlickCarouselModule,
    HttpClientModule,
    FullCalendarModule,
    NgbModule,
    NgbTooltip,
    NgbTooltipModule,
    BsDatepickerModule.forRoot(),
    RouterModule
  ],

  providers: [interceptorProvider]
})

export class PagesModule { }
