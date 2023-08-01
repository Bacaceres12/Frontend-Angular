import { interceptorProvider } from './../interceptors/tramites.interceptor';
import { RouterModule } from '@angular/router';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider, MicrosoftLoginProvider } from '@abacritt/angularx-social-login';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { NuevaPasswordComponent } from './nueva-password/nueva-password.component';


@NgModule({
  declarations: [LoginComponent, RegistroComponent, ForgotPasswordComponent, NuevaPasswordComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ToastrModule.forRoot(),
    SocialLoginModule
  ],

  providers: [

    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('your-google-client-id')
          },
          {
            id: MicrosoftLoginProvider.PROVIDER_ID,
            provider: new MicrosoftLoginProvider('your-microsoft-client-id')
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  exports: [LoginComponent, RegistroComponent]

})
export class AuthModule { }
