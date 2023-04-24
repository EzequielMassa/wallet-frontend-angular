import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TotalComponent} from './components/total/total.component';
import {MatTooltipModule} from "@angular/material/tooltip";


@NgModule({
  declarations: [
    TotalComponent
  ],
  exports: [
    TotalComponent
  ],
  imports: [
    CommonModule,
    MatTooltipModule
  ]
})
export class TotalModule {
}
