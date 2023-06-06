import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {catchError, map, of, switchMap, tap} from 'rxjs';
import { PersistanceService } from '../../../../../../shared/services/persistance.service';
import { CurrentUserInterface } from '../../../../../../shared/types/currentUser.interface';
import { AuthService } from '../../services/auth.service';
import {
  registerAction, registerFailureAction,
  registerSuccessAction,
} from '../actions/register.action';
import {HttpErrorResponse} from "@angular/common/http";
import {loginFailureAction} from "../actions/login.actions";

@Injectable()
export class RegisterEffect {
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerAction),
      switchMap(({ request }) => {
        return this.authService.register(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            return registerSuccessAction({ currentUser });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(registerFailureAction({ errors: errorResponse.error }));
          })
        );
      })
    )
  );

  redirectAfterSubmit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(registerSuccessAction),
        tap(() => {
          this.router.navigateByUrl('/auth/login');
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private persistanceService: PersistanceService,
    private router: Router
  ) {}
}
