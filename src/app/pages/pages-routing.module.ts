import { PagesComponent } from './pages.component';
import { ConsultaTramitesComponent } from './tramites/consulta-tramites/consulta-tramites.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { EditarSolicitudComponent } from './editar-solicitud/editar-solicitud.component';
import { VerSolicitudComponent } from './ver-solicitud/ver-solicitud.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { ConsultasComponent } from './consultas/consultas.component';
import { TramitesComponent } from './tramites/tramites.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../guards/auth.guard';
import { AsignaturasComponent } from './asignaturas/asignaturas.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { AsignacionComponent } from './asignacion/asignacion.component';
import { SemestreComponent } from './semestre/semestre.component';
import { PerfilComponent } from './perfil/perfil.component';

const routes: Routes = [

  {path:'dashboard', component:PagesComponent, canActivate: [AuthGuard],


  children:[
    {path:'', component:DashboardComponent,  data: { titulo: 'Dashboard' }},
    {path:'tramites', component:TramitesComponent, data: {titulo: 'Tramites'}},
    {path:'consultatramites', component: ConsultaTramitesComponent, data:{titulo: 'Tramites'}},
    {path:'consultas', component:ConsultasComponent, data:{ titulo: 'Consultas' }},
    {path:'usuario', component:UsuarioComponent,  data:{ titulo: 'Usuario' }},
    {path:'versolicitud', component:VerSolicitudComponent, data:{ titulo: 'Versolicitud' }},
    {path:'asignaturas', component:AsignaturasComponent, data: {titulo: 'asignaturas'}},
    {path:'editar/:id', component:EditarSolicitudComponent},
    {path:'calendario', component:CalendarioComponent, data:{ titulo: 'Calendario'}},
    {path:'configuracion', component:ConfiguracionComponent, data: {titulo:'Configuración'}},
    {path:'estadisticas', component:EstadisticasComponent, data: {titulo:'Estadísticas'}},
    {path:'asignacion', component:AsignacionComponent, data: {titulo:'asignación'}},
    {path:'semestre', component:SemestreComponent, data: {titulo:'semestre'}},
    {path: 'perfil', component: PerfilComponent},



  ]
 }
];

@NgModule({
  declarations: [],
  imports: [

    RouterModule.forChild(routes)

  ],
  exports:[RouterModule]
})
export class PagesRoutingModule {
 }
