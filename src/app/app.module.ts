import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterModule } from 'src/app/shared/modules/footer/footer.module';
import { TopNavbarModule } from 'src/app/shared/modules/top-navbar/top-navbar.module';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppComponent } from './app.component';
import { AuthInterceptorProvider } from './pages/wallet/pages/auth/interceptors/auth.interceptor';
import { PersistanceService } from './shared/services/persistance.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FooterModule,
    TopNavbarModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([]),
  ],
  providers: [AuthInterceptorProvider, PersistanceService],
  bootstrap: [AppComponent],
})
export class AppModule {}
