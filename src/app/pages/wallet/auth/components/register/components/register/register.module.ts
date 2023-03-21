import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './components/register.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [RegisterComponent],
  imports: [CommonModule, RegisterRoutingModule,ReactiveFormsModule],
})
export class RegisterModule {}
