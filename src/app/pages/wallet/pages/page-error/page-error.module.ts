import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageErrorComponent } from './page-error.component';
import {PageErrorRoutingModule} from "./page-error-routing.module";
import {LottieComponent} from "ngx-lottie";



@NgModule({
  declarations: [
    PageErrorComponent
  ],
  imports: [
    CommonModule,
    PageErrorRoutingModule,
    LottieComponent,
  ],
  exports: [
    PageErrorComponent
  ]
})
export class PageErrorModule { }
