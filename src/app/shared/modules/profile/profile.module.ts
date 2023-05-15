import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileComponent} from './components/profile/profile.component';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatTooltipModule} from "@angular/material/tooltip";
import {StoreModule} from "@ngrx/store";
import {reducers} from "../../../pages/wallet/pages/auth/store/reducers/auth.reducers";
import {EffectsModule} from "@ngrx/effects";
import {LogoutEffect} from "../../../pages/wallet/pages/auth/store/effects/logout.effect";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    ProfileComponent
  ],
  exports: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatTooltipModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([LogoutEffect]),
  ]
})
export class ProfileModule {
}
