import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GenericModalComponent} from './components/generic-modal/generic-modal.component';
import {MatDialogModule} from '@angular/material/dialog';
import {DepositPaymentFormModule} from "../deposit-payment-form/deposit-payment-form.module";
import {GenericModalService} from "../deposit-payment-form/services/generic-modal.service";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    GenericModalComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    DepositPaymentFormModule
  ],
  providers: [GenericModalService]
})
export class GenericModalModule {
}
