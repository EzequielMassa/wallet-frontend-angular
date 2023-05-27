import {Component, Input} from '@angular/core';
import {bounceInOnEnterAnimation} from "angular-animations";

@Component({
  selector: 'wal-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css'],
  animations: [bounceInOnEnterAnimation()]
})
export class BalanceComponent {
  @Input('accountNumber') accountNumberProps!: number;
  @Input('accountBalance') accountBalanceProps!: number;
}
