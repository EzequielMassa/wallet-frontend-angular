import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DepositPaymentFormComponent } from './components/deposit-payment-form/deposit-payment-form.component';
import { GenericModalService } from './services/generic-modal.service';

@NgModule({
  declarations: [DepositPaymentFormComponent],
  exports: [DepositPaymentFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatSelectModule,
    MatDialogModule,
    MatExpansionModule,
    MatButtonModule,
  ],
  providers: [GenericModalService],
})
export class DepositPaymentFormModule {}
