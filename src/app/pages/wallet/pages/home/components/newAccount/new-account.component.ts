import {Component} from '@angular/core';
import {Store} from "@ngrx/store";
import {createNewUserAccountAction} from "../../store/actions/accounts.action";

@Component({
  selector: 'wal-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css']
})
export class NewAccountComponent {

  constructor(private store: Store) {
  }

  createAccount() {
    this.store.dispatch(createNewUserAccountAction())
  }
}
