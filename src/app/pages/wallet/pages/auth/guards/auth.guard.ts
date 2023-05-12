import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Store} from "@ngrx/store";
import {CurrentUserInterface} from "../../../../../shared/types/currentUser.interface";
import {currentUserSelector} from "../store/selectors/auth.selector";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private currentUser$!: Observable<CurrentUserInterface | null>;
  private currentUser!: CurrentUserInterface | null;

  constructor(private store: Store, private router: Router) {
    this.currentUser$ = this.store.select(currentUserSelector)
  }

  canActivate(): boolean {
    /*    this.currentUser$.pipe(
          filter(currentUser => currentUser !== null),
          map((currentUser: CurrentUserInterface | null) => {
            this.currentUser = currentUser;
          })
        ).subscribe()
        if (!this.currentUser) {
          this.router.navigateByUrl('/auth/login');
          return false;
        }*/
    return true;
  }
}
