import {isDevMode, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FooterModule} from 'src/app/shared/modules/footer/footer.module';
import {TopNavbarModule} from 'src/app/shared/modules/top-navbar/top-navbar.module';
import {AppRoutingModule} from './app-routing.module';

import {HttpClientModule} from '@angular/common/http';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {AppComponent} from './app.component';
import {AuthInterceptorProvider} from './pages/wallet/pages/auth/interceptors/auth.interceptor';
import {PersistanceService} from './shared/services/persistance.service';
import {reducers} from "./pages/wallet/pages/auth/store/reducers/auth.reducers";
import {AuthGuard} from "./pages/wallet/pages/auth/guards/auth.guard";
import {BottomNavbarModule} from "./shared/modules/bottom-navbar/bottom-navbar.module";
import {LoginEffect} from "./pages/wallet/pages/auth/store/effects/login.effect";
import {LogoutEffect} from "./pages/wallet/pages/auth/store/effects/logout.effect";
import {RegisterEffect} from "./pages/wallet/pages/auth/store/effects/register.effect";
import {UpdateProfileEffect} from "./pages/wallet/pages/auth/store/effects/update-profile.effect";
import {AuthService} from "./pages/wallet/pages/auth/services/auth.service";


import {LottieModule} from 'ngx-lottie';

export function playerFactory(): any {
  return import('lottie-web');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FooterModule,
    TopNavbarModule,
    BottomNavbarModule,
    StoreModule.forRoot({}, {}),
    StoreModule.forFeature('auth', reducers),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: !isDevMode()}),
    EffectsModule.forRoot([LoginEffect,LogoutEffect,RegisterEffect,UpdateProfileEffect]),
    LottieModule.forRoot({ player: playerFactory }),
  ],
  providers: [AuthService,AuthInterceptorProvider, AuthGuard, PersistanceService],
  bootstrap: [AppComponent],

})
export class AppModule {
}
