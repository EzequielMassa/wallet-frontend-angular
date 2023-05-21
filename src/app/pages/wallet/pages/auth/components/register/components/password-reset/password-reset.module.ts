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
import { PasswordResetComponent } from './password-reset/password-reset.component';
import {PasswordResetRoutingModule} from "./password-reset-routing.module";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    PasswordResetComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    PasswordResetRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatProgressBarModule,
    BackendErrorMessagesModule,
    /*   StoreModule.forFeature('auth', reducers),
       EffectsModule.forFeature([PasswordForgotEffects]),*/
  ],
  providers: [AuthService],
})
export class PasswordResetModule {
}
