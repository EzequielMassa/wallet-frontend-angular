import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, of, switchMap} from "rxjs";
import {AuthService} from "../../services/auth.service";
import {
  passwordForgotAction,
  passwordForgotFailureAction,
  passwordForgotSuccessAction
} from "../actions/password-forgot.actions";
import {HttpErrorResponse} from "@angular/common/http";

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
  constructor(
    private actions$: Actions,
    private authService: AuthService,
  ) {
  }
}
