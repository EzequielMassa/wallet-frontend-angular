import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, of, switchMap, tap} from "rxjs";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {
  passwordForgotAction,
  passwordForgotFailureAction,
  passwordForgotSuccessAction
} from "../actions/password-forgot.actions";
import {HttpErrorResponse} from "@angular/common/http";
import {loginSuccessAction} from "../actions/login.actions";

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
          catchError((errorResponse:HttpErrorResponse) => {
              return of(passwordForgotFailureAction({errors: errorResponse.error}));
          })
        );
      })
    )
  );

  redirectAfterSubmit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(passwordForgotSuccessAction),
        tap(() => {
          this.router.navigateByUrl('/auth/login/password-forgot/success');
        })
      ),
    {dispatch: false}
  );
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {
  }
}
