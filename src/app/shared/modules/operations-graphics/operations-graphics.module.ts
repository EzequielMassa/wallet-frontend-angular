import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgChartsConfiguration, NgChartsModule} from "ng2-charts";
import {OperationsGraphicsComponent} from './components/operations-graphics/operations-graphics.component';


@NgModule({
  declarations: [
    OperationsGraphicsComponent
  ],
  imports: [
    CommonModule,
    NgChartsModule,
  ],
  exports: [
    OperationsGraphicsComponent
  ],
  providers: [
    {provide: NgChartsConfiguration}
  ]
})
export class OperationsGraphicsModule {
}
