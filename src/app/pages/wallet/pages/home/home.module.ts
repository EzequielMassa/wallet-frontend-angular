import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {AuthInterceptorProvider} from 'src/app/pages/wallet/pages/auth/interceptors/auth.interceptor';
import {AccountService} from 'src/app/pages/wallet/pages/home/services/account.service';
import {BalanceComponent} from './components/balance/balance.component';
import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';
import {StoreModule} from "@ngrx/store";
import {homeReducers} from "./store/reducers/home.reducers";
import {AccountsEffect} from "./store/effects/accounts.effect";
import {EffectsModule} from "@ngrx/effects";
import {NewAccountComponent} from './components/newAccount/new-account.component';
import {TransactionsServicesComponent} from "./components/transactions-services/transactions-services.component";
import {ReactiveFormsModule} from "@angular/forms";
import {GenericModalModule} from "../../../../shared/modules/generic-modal/generic-modal.module";
import {MatDialogModule} from '@angular/material/dialog';
import {DepositPaymentFormModule} from "../../../../shared/modules/deposit-payment-form/deposit-payment-form.module";
import {GenericModalService} from "../../../../shared/modules/deposit-payment-form/services/generic-modal.service";
import {SlickCarouselModule} from "ngx-slick-carousel";
import {
  GenericOperationListModule
} from "../../../../shared/modules/generic-operation-list/generic-operation-list.module";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {OperationsGraphicsModule} from "../../../../shared/modules/operations-graphics/operations-graphics.module";
import {TotalModule} from "../../../../shared/modules/total/total.module";
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {incomingsReducers} from "../incomings/store/reducers/incomings.reducer";
import {IncomingsEffect} from "../incomings/store/effects/incomings.effect";
import {expensesReducers} from "../expenses/store/reducers/expenses.reducers";
import {ExpensesEffect} from "../expenses/store/effects/expenses.effect";
import lottie from 'lottie-web';
import { defineElement } from 'lord-icon-element';
import {GenericTitleModule} from "../../../../shared/modules/generic-title/generic-title.module";
import {LottieComponent} from "ngx-lottie";
@NgModule({
  declarations: [HomeComponent, BalanceComponent, NewAccountComponent, TransactionsServicesComponent],
    imports: [
        CommonModule,
        HttpClientModule,
        HomeRoutingModule,
        ReactiveFormsModule,
        GenericTitleModule,
        MatDialogModule,
        MatTooltipModule,
        MatButtonModule,
        MatIconModule,
        SlickCarouselModule,
        GenericModalModule,
        GenericOperationListModule,
        MatSlideToggleModule,
        DepositPaymentFormModule,
        OperationsGraphicsModule,
        TotalModule,
        StoreModule.forFeature('home', homeReducers),
        StoreModule.forFeature('incomings', incomingsReducers),
        StoreModule.forFeature('expenses', expensesReducers),
        EffectsModule.forFeature([AccountsEffect, IncomingsEffect, ExpensesEffect]),
        LottieComponent,
    ],
  exports: [
    HomeComponent,
  ],
  providers: [AccountService, AuthInterceptorProvider, GenericModalService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeModule {
  constructor() {
    defineElement(lottie.loadAnimation);}
}
