import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TotalComponent} from './components/total/total.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatCardModule} from "@angular/material/card";
import {defineElement} from "lord-icon-element";
import lottie from "lottie-web";


@NgModule({
  declarations: [
    TotalComponent
  ],
  exports: [
    TotalComponent
  ],
  imports: [
    CommonModule,
    MatTooltipModule,
    MatCardModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TotalModule {
  constructor() {
    defineElement(lottie.loadAnimation);}
}
