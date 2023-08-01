import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthGuard } from './../guards/auth.guard';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NuevaPasswordComponent } from './nueva-password/nueva-password.component';

const routes: Routes = [

  {path:'login',component:LoginComponent},
  {path:'registro',component:RegistroComponent},
  {path:'recuperar-contrasena',component:ForgotPasswordComponent},
  {path:'nueva-contrasena/:token', component: NuevaPasswordComponent },

]

@NgModule({


  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AuthRoutingModule { }
