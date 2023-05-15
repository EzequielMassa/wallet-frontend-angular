import {Component} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {logoutAction} from "../../../../../pages/wallet/pages/auth/store/actions/logout.actions";
import {Observable} from "rxjs";
import {CurrentUserInterface} from "../../../../types/currentUser.interface";
import {currentUserSelector} from "../../../../../pages/wallet/pages/auth/store/selectors/auth.selector";
import {Router} from "@angular/router";

@Component({
  selector: 'wal-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  currentUser$!: Observable<CurrentUserInterface | null>;

  constructor(private store: Store, private router: Router) {
    this.currentUser$ = this.store.pipe(select(currentUserSelector))
  }

  navigate(): void {
    this.router.navigate(['/profile/edit'])
  }

  onLogout(): void {
    this.store.dispatch(logoutAction())
  }
}
