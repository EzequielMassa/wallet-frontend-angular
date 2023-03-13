import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TopNavbarComponent } from './components/top-navbar/top-navbar.component';

@NgModule({
  declarations: [TopNavbarComponent],
  imports: [CommonModule],
  exports: [TopNavbarComponent],
})
export class TopNavbarModule {}
