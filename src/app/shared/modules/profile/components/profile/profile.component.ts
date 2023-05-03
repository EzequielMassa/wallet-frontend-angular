import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {logoutAction} from "../../../../../pages/wallet/pages/auth/store/actions/logout.actions";

@Component({
  selector: 'wal-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  constructor(private store: Store) {
  }

  onLogout(): void {
    this.store.dispatch(logoutAction())
  }
}
