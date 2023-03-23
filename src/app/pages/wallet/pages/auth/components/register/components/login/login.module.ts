import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {
  LoginComponent
} from 'src/app/pages/wallet/pages/auth/components/register/components/login/components/login.component';
import {LoginRoutingModule} from './login-routing.module';
import {StoreModule} from "@ngrx/store";
import {reducers} from "../../../../store/reducers/auth.reducers";

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature('auth', reducers),],
})
export class LoginModule {
}
