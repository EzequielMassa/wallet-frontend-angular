import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {map, switchMap} from 'rxjs';
import {AuthService} from '../../services/auth.service';
import {registerAction, registerSuccessAction} from "../actions/register.action";
import {CurrentUserInterface} from "../../../../../../shared/types/currentUser.interface";
import {PersistanceService} from "../../../../../../shared/services/persistance.service";

@Injectable()
export class RegisterEffect {
  register$ = createEffect(() => this.actions$.pipe(
    ofType(registerAction),
    switchMap(({request,}) => {
      return this.authService.register(request).pipe(
        map((currentUser: CurrentUserInterface) => {
          this.persistanceService.set("accesToken", currentUser.token)
          return registerSuccessAction({currentUser})
        })
      )
    })
  ))

  constructor(private actions$: Actions, private authService: AuthService, private persistanceService: PersistanceService) {
  }
}
