import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericTitleComponent } from './components/generic-title.component';
import {MatCardModule} from "@angular/material/card";
import {LottieComponent} from "ngx-lottie";



@NgModule({
  declarations: [
    GenericTitleComponent
  ],
    imports: [
        CommonModule,
        MatCardModule,
        LottieComponent
    ],
  exports: [
    GenericTitleComponent
  ]
})
export class GenericTitleModule { }
