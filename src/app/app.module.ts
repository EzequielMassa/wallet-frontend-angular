import {isDevMode, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FooterModule} from 'src/app/shared/modules/footer/footer.module';
import {TopNavbarModule} from 'src/app/shared/modules/top-navbar/top-navbar.module';
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
import {AuthInterceptorProvider} from "./pages/wallet/pages/auth/interceptors/auth.interceptor";
import {PersistanceService} from "./shared/services/persistance.service";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FooterModule,
    TopNavbarModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: !isDevMode()}),
    EffectsModule.forRoot([]),
  ],
  providers: [AuthInterceptorProvider, PersistanceService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
