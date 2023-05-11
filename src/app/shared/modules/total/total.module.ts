import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TotalComponent} from './components/total/total.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatCardModule} from "@angular/material/card";


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
  ]
})
export class TotalModule {
}
