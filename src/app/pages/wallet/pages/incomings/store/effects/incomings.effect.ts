import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {getCurrentYearIncomingsAction, getCurrentYearIncomingsSuccessAction} from "../actions/incomings.action";
import {map, switchMap} from "rxjs";
import {IncomingsMonthResponseInterface} from "../../../../../../shared/types/incomingsMonthResponse.interface";
import {IncomingsService} from "../../services/incomings.service";


@Injectable()
export class IncomingsEffect {

  currentYearIncomings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCurrentYearIncomingsAction),
      switchMap(() => {
        return this.incomingsService.getAccountIncomingsByYear().pipe(
          map((currentMonthIncomings: IncomingsMonthResponseInterface[]) => {
            if (currentMonthIncomings == null) {
              currentMonthIncomings = [];
            }
            return getCurrentYearIncomingsSuccessAction({monthIncomings: currentMonthIncomings});
          }),
        );
      })
    )
  )
  constructor(private actions$: Actions, private incomingsService: IncomingsService) {
  }
}
