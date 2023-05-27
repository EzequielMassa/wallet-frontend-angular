import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IncomingsComponent} from './incomings.component';
import {IncomingsRoutingModule} from "./incomings-routing.module";
import {TotalModule} from "../../../../shared/modules/total/total.module";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {
  GenericOperationListModule
} from "../../../../shared/modules/generic-operation-list/generic-operation-list.module";
import {OperationsGraphicsModule} from "../../../../shared/modules/operations-graphics/operations-graphics.module";
import {IncomingsService} from "./services/incomings.service";
import {incomingsReducers} from "./store/reducers/incomings.reducer";
import {IncomingsEffect} from "./store/effects/incomings.effect";
import {HttpClientModule} from "@angular/common/http";
import {GenericTitleModule} from "../../../../shared/modules/generic-title/generic-title.module";


@NgModule({
  declarations: [
    IncomingsComponent
  ],
    imports: [
        CommonModule,
        HttpClientModule,
        IncomingsRoutingModule,
        TotalModule,
        GenericOperationListModule,
        OperationsGraphicsModule,
        StoreModule.forFeature('incomings', incomingsReducers),
        EffectsModule.forFeature([IncomingsEffect]),
        GenericTitleModule,
    ],
  exports: [
    IncomingsComponent
  ],
  providers: [
    IncomingsService
  ]
})
export class IncomingsModule {
}
