import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../../../../services/auth.service";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {HttpClientModule} from "@angular/common/http";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {
  BackendErrorMessagesModule
} from "../../../../../../../../shared/modules/backend-error-messages/backend-error-messages.module";
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import {PasswordResetRoutingModule} from "./password-reset-routing.module";
import {MatIconModule} from "@angular/material/icon";
import {PasswordResetEffects} from "../../../../store/effects/password-reset.effect";
import {reducers} from "../../../../store/reducers/auth.reducers";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {BackendMessagesModule} from "../../../../../../../../shared/modules/backend-messages/backend-messages.module";
import { PasswordResetSuccessComponent } from './components/password-reset-success/password-reset-success.component';
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    PasswordResetComponent,
    PasswordResetSuccessComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    PasswordResetRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatProgressBarModule,
    BackendErrorMessagesModule,
    BackendMessagesModule,
       StoreModule.forFeature('auth', reducers),
       EffectsModule.forFeature([PasswordResetEffects]),
  ],
  providers: [AuthService],
})
export class PasswordResetModule {
}
