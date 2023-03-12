import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WalletRoutingModule } from 'src/app/pages/wallet/wallet-routing.module';
import { FooterModule } from 'src/app/shared/modules/footer/footer.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, WalletRoutingModule, FooterModule],
})
export class WalletModule {}
