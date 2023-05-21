import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, of, switchMap} from "rxjs";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {
  passwordForgotAction,
  passwordForgotFailureAction,
  passwordForgotSuccessAction
} from "../actions/password-forgot.actions";

@Injectable()
export class PasswordForgotEffects {
  passwordForgot$ = createEffect(() =>
    this.actions$.pipe(
      ofType(passwordForgotAction),
      switchMap(({request}) => {
        return this.authService.passwordForgot(request).pipe(
          map((data) => {
            console.log(data)
            return passwordForgotSuccessAction();
          }),
          catchError(() => {
              return of(passwordForgotFailureAction());
          })
        );
      })
    )
  );
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {
  }
}
