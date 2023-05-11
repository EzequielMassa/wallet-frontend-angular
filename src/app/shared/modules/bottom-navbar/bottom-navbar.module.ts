import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {BottomNavbarComponent} from './components/bottom-navbar.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MatToolbarModule} from "@angular/material/toolbar";
import {ProfileModule} from "../profile/profile.module";
import {RouterLink} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    BottomNavbarComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    NgOptimizedImage,
    ProfileModule,
    RouterLink
  ],
  exports: [
    BottomNavbarComponent
  ]
})
export class BottomNavbarModule {
}
