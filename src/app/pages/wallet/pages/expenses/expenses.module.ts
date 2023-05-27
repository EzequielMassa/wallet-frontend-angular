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
import {EffectsModule} from "@ngrx/effects";
import {expensesReducers} from "./store/reducers/expenses.reducers";
import {ExpensesEffect} from "./store/effects/expenses.effect";
import {HttpClientModule} from "@angular/common/http";
import {ExpensesService} from "./services/expenses.service";
import {GenericTitleModule} from "../../../../shared/modules/generic-title/generic-title.module";


@NgModule({
  declarations: [
    ExpensesComponent
  ],
    imports: [
        CommonModule,
        HttpClientModule,
        ExpensesRoutingModule,
        TotalModule,
        GenericOperationListModule,
        OperationsGraphicsModule,
        StoreModule.forFeature('expenses', expensesReducers),
        EffectsModule.forFeature([ExpensesEffect]),
        GenericTitleModule,
    ],
  exports: [
    ExpensesComponent
  ],
  providers: [
    ExpensesService
  ]
})
export class ExpensesModule {
}
