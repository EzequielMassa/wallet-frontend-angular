import {Component, HostListener} from '@angular/core';
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
  public getScreenWidth: any;

  constructor(private store: Store) {
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector));
  }

  ngOnInit() {
    this.getScreenWidth = window.innerWidth;

  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
  }
}
