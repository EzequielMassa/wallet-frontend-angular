import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { map, switchMap, tap } from 'rxjs';
import { CurrentUserInterface } from '../../../../../../shared/types/currentUser.interface';
import { AuthService } from '../../services/auth.service';
import {
  updateProfileAction,
  updateProfileSuccessAction,
} from '../actions/update-profile.action';

@Injectable()
export class UpdateProfileEffect {
  updateProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateProfileAction),
      switchMap(({ request }) => {
        return this.authService.updateProfile(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            return updateProfileSuccessAction({ currentUser });
          })
        );
      })
    )
  );

  profileUpdated$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateProfileSuccessAction),
        tap(() => {
          this.showSuccess('Profile updated successfully!');
        })
      ),
    { dispatch: false }
  );
  showSuccess(title: string) {
    this.toastr.success('', title, { positionClass: 'toast-bottom-right' });
  }
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}
}
