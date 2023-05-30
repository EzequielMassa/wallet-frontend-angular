import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SpinnerComponent} from './components/spinner.component';
import {SpinnerService} from "./services/spinner.service";


@NgModule({
  declarations: [
    SpinnerComponent
  ],
  exports: [
    SpinnerComponent
  ],
  imports: [
    CommonModule,
  ],
  providers: [SpinnerService]
})
export class SpinnerModule { }
