import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {map, switchMap, tap} from 'rxjs';
import {AuthService} from '../../services/auth.service';
import {registerAction, registerSuccessAction} from "../actions/register.action";
import {CurrentUserInterface} from "../../../../../../shared/types/currentUser.interface";
import {PersistanceService} from "../../../../../../shared/services/persistance.service";
import {Router} from '@angular/router';

@Injectable()
export class RegisterEffect {
  register$ = createEffect(() => this.actions$.pipe(
    ofType(registerAction),
    switchMap(({request}) => {
      return this.authService.register(request).pipe(
        map((currentUser: CurrentUserInterface) => {
          this.persistanceService.set("accessToken", currentUser.token)
          return registerSuccessAction({currentUser})
        })
      )
    })
  ))

  redirectAfterSubmit$ = createEffect(() =>
      this.actions$.pipe(
        ofType(registerSuccessAction),
        tap(() => {
          this.router.navigateByUrl('/auth/login')
        })),
    {dispatch: false}
  )

  constructor(private actions$: Actions, private authService: AuthService, private persistanceService: PersistanceService, private router: Router) {
  }
}
