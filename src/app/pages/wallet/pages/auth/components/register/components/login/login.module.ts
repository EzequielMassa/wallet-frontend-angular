import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {
  LoginComponent
} from 'src/app/pages/wallet/pages/auth/components/register/components/login/components/login.component';
import {LoginRoutingModule} from './login-routing.module';
import {StoreModule} from "@ngrx/store";
import {reducers} from "../../../../store/reducers/auth.reducers";
import {HttpClientModule} from "@angular/common/http";
import {LoginEffect} from "../../../../store/effects/login.effect";
import {EffectsModule} from '@ngrx/effects';
import {AuthService} from "../../../../services/auth.service";
import {PersistanceService} from "../../../../../../../../shared/services/persistance.service";
import {MatButtonModule} from "@angular/material/button";
import {PasswordForgotModule} from "../password-forgot/password-forgot.module";

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    PasswordForgotModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([LoginEffect]),
  ],
  providers: [AuthService, PersistanceService]

})
export class LoginModule {
}
