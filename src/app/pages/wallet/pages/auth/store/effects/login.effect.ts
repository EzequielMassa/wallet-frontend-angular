import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, switchMap, tap} from 'rxjs';
import {PersistanceService} from '../../../../../../shared/services/persistance.service';
import {CurrentUserInterface} from '../../../../../../shared/types/currentUser.interface';
import {AuthService} from '../../services/auth.service';
import {loginAction, loginSuccessAction} from '../actions/login.actions';

@Injectable()
export class LoginEffect {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginAction),
      switchMap(({request}) => {
        return this.authService.login(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            this.persistanceService.set('accessToken', currentUser.token);
            this.persistanceService.set('userId', currentUser.id);
            return loginSuccessAction({currentUser});
          })
        );
      })
    )
  );

  redirectAfterSubmit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccessAction),
        tap(() => {
          this.router.navigateByUrl('/home');
        })
      ),
    {dispatch: false}
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private persistanceService: PersistanceService,
    private router: Router
  ) {
  }
}
