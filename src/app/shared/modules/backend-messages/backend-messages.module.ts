import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {BackendMessagesComponent} from './components/backend-messages.component';


@NgModule({
  declarations: [
    BackendMessagesComponent
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule
  ],
  exports: [
    BackendMessagesComponent
  ]
})
export class BackendMessagesModule { }
