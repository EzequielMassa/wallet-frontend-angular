import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {RegisterRoutingModule} from './register-routing.module';
import {RegisterComponent} from './components/register.component';
import {ReactiveFormsModule} from "@angular/forms";
import {reducers} from "../../../../store/reducers/auth.reducers";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from '@ngrx/effects';
import {RegisterEffect} from "../../../../store/effects/register.effect";
import {
  BackendErrorMessagesModule
} from "../../../../../../../../shared/modules/backendErrorMessages/backend-error-messages.module";

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([RegisterEffect]),
    BackendErrorMessagesModule
  ],
})
export class RegisterModule {
}