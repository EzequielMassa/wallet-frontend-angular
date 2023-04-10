import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DepositPaymentFormComponent} from './components/deposit-payment-form/deposit-payment-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {GenericModalService} from "./services/generic-modal.service";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatCardModule} from "@angular/material/card";
import {MatDialogModule} from "@angular/material/dialog";


@NgModule({
  declarations: [
    DepositPaymentFormComponent
  ],
  exports: [
    DepositPaymentFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatDialogModule
  ],
  providers: [GenericModalService]
})
export class DepositPaymentFormModule {
}
