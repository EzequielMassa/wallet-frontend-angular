import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import {
  passwordForgotAction,
  passwordForgotFailureAction,
  passwordForgotSuccessAction,
} from '../actions/password-forgot.actions';

@Injectable()
export class PasswordForgotEffects {
  passwordForgot$ = createEffect(() =>
    this.actions$.pipe(
      ofType(passwordForgotAction),
      switchMap(({ request }) => {
        return this.authService.passwordForgot(request).pipe(
          map((data) => {
            return passwordForgotSuccessAction({ backendMessages: data });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              passwordForgotFailureAction({ errors: errorResponse.error })
            );
          })
        );
      })
    )
  );
  constructor(private actions$: Actions, private authService: AuthService) {}
}
