import {NgModule} from '@angular/core';

import {RegisterRoutingModule} from './register-routing.module';
import {RegisterComponent} from './components/register.component';
import {ReactiveFormsModule} from "@angular/forms";
import {reducers} from "../../../../store/reducers/auth.reducers";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from '@ngrx/effects';
import {RegisterEffect} from "../../../../store/effects/register.effect";
import {AuthService} from "../../../../services/auth.service";
import {MatButtonModule} from "@angular/material/button";
import {GenericTitleModule} from "../../../../../../../../shared/modules/generic-title/generic-title.module";
import {
  BackendErrorMessagesModule
} from "../../../../../../../../shared/modules/backend-error-messages/backend-error-messages.module";
import {LottieComponent} from "ngx-lottie";
import {TermsConditionsModalComponent} from './components/terms-conditions-modal/terms-conditions-modal.component';
import {MatDialogModule} from "@angular/material/dialog";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [RegisterComponent, TermsConditionsModalComponent],
    imports: [

      CommonModule,
        RegisterRoutingModule,
        ReactiveFormsModule,
        GenericTitleModule,
        MatButtonModule,
       MatDialogModule,
        StoreModule.forFeature('auth', reducers),
        EffectsModule.forFeature([RegisterEffect]),
        BackendErrorMessagesModule,
        LottieComponent,
    ],
  providers: [AuthService]

})
export class RegisterModule {
}
