import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {map, tap} from "rxjs";
import {PersistanceService} from "../../../../../../shared/services/persistance.service";
import {Router} from "@angular/router";
import {logoutAction, logoutSuccessAction} from "../actions/logout.actions";

@Injectable()
export class LogoutEffect {
  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logoutAction),
      map(() => {
        this.persistanceService.clear()
        return logoutSuccessAction();
      })
    )
  );

  redirectAfterLogout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logoutSuccessAction),
        tap(() => {
          this.router.navigateByUrl('/auth/login');
        })
      ),
    {dispatch: false}
  );

  constructor(
    private actions$: Actions,
    private persistanceService: PersistanceService,
    private router: Router
  ) {
  }
}
