import { Component, Input } from '@angular/core';

@Component({
  selector: 'wal-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css'],
})
export class BalanceComponent {
  @Input('accountNumber') accountNumberProps!: number;
  @Input('accountBalance') accountBalanceProps!: number;
}
