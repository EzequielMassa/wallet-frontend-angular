import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {AuthInterceptorProvider} from 'src/app/pages/wallet/pages/auth/interceptors/auth.interceptor';
import {AccountService} from 'src/app/pages/wallet/pages/home/services/account.service';
import {BalanceComponent} from './components/balance/balance.component';
import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';
import {StoreModule} from "@ngrx/store";
import {homeReducers} from "./store/reducers/home.reducers";
import {AccountsEffect} from "./store/effects/accounts.effect";
import {EffectsModule} from "@ngrx/effects";

@NgModule({
  declarations: [HomeComponent, BalanceComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    HomeRoutingModule,
    StoreModule.forFeature('home', homeReducers),
    EffectsModule.forFeature([AccountsEffect])
  ],
  exports: [
    HomeComponent,
  ],
  providers: [AccountService, AuthInterceptorProvider],
})
export class HomeModule {
  constructor() {
  }
}
