import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { defineElement } from 'lord-icon-element';
import lottie from 'lottie-web';
import { LottieComponent } from 'ngx-lottie';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { AuthInterceptorProvider } from 'src/app/pages/wallet/pages/auth/interceptors/auth.interceptor';
import { AccountService } from 'src/app/pages/wallet/pages/home/services/account.service';
import { DepositPaymentFormModule } from '../../../../shared/modules/deposit-payment-form/deposit-payment-form.module';
import { GenericModalService } from '../../../../shared/modules/deposit-payment-form/services/generic-modal.service';
import { GenericModalModule } from '../../../../shared/modules/generic-modal/generic-modal.module';
import { GenericOperationListModule } from '../../../../shared/modules/generic-operation-list/generic-operation-list.module';
import { GenericTitleModule } from '../../../../shared/modules/generic-title/generic-title.module';
import { OperationsGraphicsModule } from '../../../../shared/modules/operations-graphics/operations-graphics.module';
import { TotalModule } from '../../../../shared/modules/total/total.module';
import { ExpensesEffect } from '../expenses/store/effects/expenses.effect';
import { expensesReducers } from '../expenses/store/reducers/expenses.reducers';
import { IncomingsEffect } from '../incomings/store/effects/incomings.effect';
import { incomingsReducers } from '../incomings/store/reducers/incomings.reducer';
import { BalanceComponent } from './components/balance/balance.component';
import { NewAccountComponent } from './components/newAccount/new-account.component';
import { TransactionsServicesComponent } from './components/transactions-services/transactions-services.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { AccountsEffect } from './store/effects/accounts.effect';
import { homeReducers } from './store/reducers/home.reducers';
@NgModule({
  declarations: [
    HomeComponent,
    BalanceComponent,
    NewAccountComponent,
    TransactionsServicesComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    GenericTitleModule,
    MatDialogModule,
    MatDividerModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    SlickCarouselModule,
    GenericModalModule,
    GenericOperationListModule,
    MatSlideToggleModule,
    MatBadgeModule,
    DepositPaymentFormModule,
    OperationsGraphicsModule,
    TotalModule,
    StoreModule.forFeature('home', homeReducers),
    StoreModule.forFeature('incomings', incomingsReducers),
    StoreModule.forFeature('expenses', expensesReducers),
    EffectsModule.forFeature([AccountsEffect, IncomingsEffect, ExpensesEffect]),
    LottieComponent,
  ],
  exports: [HomeComponent],
  providers: [AccountService, AuthInterceptorProvider, GenericModalService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeModule {
  constructor() {
    defineElement(lottie.loadAnimation);
  }
}
