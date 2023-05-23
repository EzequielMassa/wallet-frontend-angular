import {
  passwordResetAction,
  passwordResetFailureAction,
  passwordResetSuccessAction
} from "../actions/password-reset.actions";
import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, of, switchMap} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";


@Injectable()
export class PasswordResetEffects {
  passwordReset$ = createEffect(() =>
    this.actions$.pipe(
      ofType(passwordResetAction),
      switchMap(({request}) => {
        return this.authService.resetPassword(request).pipe(
          map((data) => {
            return passwordResetSuccessAction({backendMessage:data});
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(passwordResetFailureAction({errors: errorResponse.error}));
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
