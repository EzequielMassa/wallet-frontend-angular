import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IncomingsComponent} from './incomings.component';
import {IncomingsRoutingModule} from "./incomings-routing.module";
import {TotalModule} from "../../../../shared/modules/total/total.module";
import {AccountService} from "../home/services/account.service";
import {StoreModule} from "@ngrx/store";
import {homeReducers} from "../home/store/reducers/home.reducers";
import {EffectsModule} from "@ngrx/effects";
import {AccountsEffect} from "../home/store/effects/accounts.effect";
import {
  GenericOperationListModule
} from "../../../../shared/modules/generic-operation-list/generic-operation-list.module";
import {OperationsGraphicsModule} from "../../../../shared/modules/operations-graphics/operations-graphics.module";


@NgModule({
  declarations: [
    IncomingsComponent
  ],
  imports: [
    CommonModule,
    IncomingsRoutingModule,
    TotalModule,
    GenericOperationListModule,
    OperationsGraphicsModule,
    StoreModule.forFeature('home', homeReducers),
    EffectsModule.forFeature([AccountsEffect]),
  ],
  exports: [
    IncomingsComponent
  ],
  providers: [
    AccountService
  ]
})
export class IncomingsModule {
}
