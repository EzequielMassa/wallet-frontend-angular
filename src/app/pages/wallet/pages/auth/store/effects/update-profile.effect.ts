import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {updateProfileAction, updateProfileSuccessAction} from "../actions/update-profile.action";
import {map, switchMap} from "rxjs";
import {CurrentUserInterface} from "../../../../../../shared/types/currentUser.interface";
import {AuthService} from "../../services/auth.service";


@Injectable()
export class UpdateProfileEffect {

  updateProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateProfileAction),
      switchMap(({request}) => {
        return this.authService.updateProfile(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            return updateProfileSuccessAction({currentUser});
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
