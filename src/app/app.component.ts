import {Component} from '@angular/core';
import {Observable} from "rxjs";
import {select, Store} from "@ngrx/store";
import {isLoggedInSelector} from "./pages/wallet/pages/auth/store/selectors/auth.selector";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn$!: Observable<boolean | null>;

  constructor(private store: Store) {
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector));
  }
}
