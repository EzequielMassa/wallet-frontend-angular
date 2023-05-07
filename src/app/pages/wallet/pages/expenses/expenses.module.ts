import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExpensesComponent} from './expenses.component';
import {ExpensesRoutingModule} from "./expenses-routing.module";
import {TotalModule} from "../../../../shared/modules/total/total.module";
import {
  GenericOperationListModule
} from "../../../../shared/modules/generic-operation-list/generic-operation-list.module";
import {OperationsGraphicsModule} from "../../../../shared/modules/operations-graphics/operations-graphics.module";
import {StoreModule} from "@ngrx/store";
import {homeReducers} from "../home/store/reducers/home.reducers";
import {EffectsModule} from "@ngrx/effects";
import {AccountsEffect} from "../home/store/effects/accounts.effect";
import {AccountService} from "../home/services/account.service";


@NgModule({
  declarations: [
    ExpensesComponent
  ],
  imports: [
    CommonModule,
    ExpensesRoutingModule,
    TotalModule,
    GenericOperationListModule,
    OperationsGraphicsModule,
    StoreModule.forFeature('home', homeReducers),
    EffectsModule.forFeature([AccountsEffect]),
  ],
  exports: [
    ExpensesComponent
  ],
  providers: [
    AccountService
  ]
})
export class ExpensesModule {
}
