import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackendErrorMessagesComponent } from './components/backend-error-messages.component';
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";



@NgModule({
  declarations: [
    BackendErrorMessagesComponent
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule
  ],
  exports: [
    BackendErrorMessagesComponent
  ]
})
export class BackendErrorMessagesModule { }
