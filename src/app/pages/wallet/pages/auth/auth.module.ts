import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './auth-routing.module';
import {HttpClientModule} from "@angular/common/http";
import {AuthService} from "./services/auth.service";
import {PersistanceService} from "../../../../shared/services/persistance.service";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthRoutingModule,
    HttpClientModule
  ],
  providers: [AuthService, PersistanceService]
})
export class AuthModule {
}
