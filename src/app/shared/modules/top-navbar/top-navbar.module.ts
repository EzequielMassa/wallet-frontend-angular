import {CommonModule, NgOptimizedImage} from '@angular/common';
import {NgModule} from '@angular/core';
import {TopNavbarComponent} from './components/top-navbar/top-navbar.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {RouterModule} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTabsModule} from "@angular/material/tabs";
import {ProfileModule} from "../profile/profile.module";

@NgModule({
  declarations: [TopNavbarComponent],
  imports: [CommonModule, MatToolbarModule, RouterModule, NgOptimizedImage, MatButtonModule, MatTabsModule, MatIconModule, ProfileModule],
  exports: [TopNavbarComponent],
})
export class TopNavbarModule {
}
