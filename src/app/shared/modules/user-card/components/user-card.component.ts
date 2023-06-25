import { Component, Input } from '@angular/core';
import { UsersDTOInterface } from '../../../../pages/wallet/pages/home/types/usersDTO.interface';

@Component({
  selector: 'wal-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
})
export class UserCardComponent {
  @Input('user') userProps!: UsersDTOInterface;
}
