import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { LottieComponent } from 'ngx-lottie';
import { LoginComponent } from 'src/app/pages/wallet/pages/auth/components/register/components/login/components/login.component';
import { BackendErrorMessagesModule } from 'src/app/shared/modules/backend-error-messages/backend-error-messages.module';
import { GenericTitleModule } from '../../../../../../../../shared/modules/generic-title/generic-title.module';
import { PersistanceService } from '../../../../../../../../shared/services/persistance.service';
import { AuthService } from '../../../../services/auth.service';
import { LoginEffect } from '../../../../store/effects/login.effect';
import { reducers } from '../../../../store/reducers/auth.reducers';
import { PasswordForgotModule } from '../password-forgot/password-forgot.module';
import { LoginRoutingModule } from './login-routing.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    PasswordForgotModule,
    BackendErrorMessagesModule,
    ReactiveFormsModule,
    HttpClientModule,
    GenericTitleModule,
    MatButtonModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([LoginEffect]),
    LottieComponent,
  ],
  providers: [AuthService, PersistanceService],
})
export class LoginModule {}
