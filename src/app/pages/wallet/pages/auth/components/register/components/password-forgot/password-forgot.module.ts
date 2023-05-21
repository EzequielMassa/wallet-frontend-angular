import {NgModule} from "@angular/core";
import {PasswordForgotComponent} from "./components/password-forgot/password-forgot.component";
import {CommonModule} from "@angular/common";
import {PasswordForgotRoutingModule} from "./password-forgot-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../../../../services/auth.service";
import {PersistanceService} from "../../../../../../../../shared/services/persistance.service";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {StoreModule} from "@ngrx/store";
import {reducers} from "../../../../store/reducers/auth.reducers";
import {EffectsModule} from "@ngrx/effects";
import {LoginEffect} from "../../../../store/effects/login.effect";
import {PasswordForgotEffects} from "../../../../store/effects/password-forgot.effect";
import {HttpClientModule} from "@angular/common/http";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {
  BackendErrorMessagesModule
} from "../../../../../../../../shared/modules/backend-error-messages/backend-error-messages.module";
import { PasswordForgotSuccessComponent } from './components/password-forgot-success/password-forgot-success.component';


@NgModule({
  declarations: [PasswordForgotComponent, PasswordForgotSuccessComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    PasswordForgotRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatProgressBarModule,
    BackendErrorMessagesModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([PasswordForgotEffects]),
  ],
  providers: [AuthService, PersistanceService],
})
export class PasswordForgotModule {
}
