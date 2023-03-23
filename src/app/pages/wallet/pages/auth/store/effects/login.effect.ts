import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {map, switchMap} from "rxjs";
import {CurrentUserInterface} from "../../../../../../shared/types/currentUser.interface";
import {AuthService} from "../../services/auth.service";
import {loginAction, loginSuccessAction} from "../actions/login.actions";
import {PersistanceService} from "../../../../../../shared/services/persistance.service";

@Injectable()
export class LoginEffect {
  login$ = createEffect(() => this.actions$.pipe(
    ofType(loginAction),
    switchMap(({request,}) => {
      return this.authService.login(request).pipe(
        map((currentUser: CurrentUserInterface) => {
          this.persistanceService.set("accesToken", currentUser.token)
          return loginSuccessAction({currentUser})
        })
      )
    })
  ))

  constructor(private actions$: Actions, private authService: AuthService, private persistanceService: PersistanceService) {
  }
}
