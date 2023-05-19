import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {
  getCurrentMonthIncomingsAction, getCurrentMonthIncomingsSuccessAction,
  getCurrentYearIncomingsAction,
  getCurrentYearIncomingsSuccessAction
} from "../actions/incomings.action";
import {map, switchMap} from "rxjs";
import {IncomingsMonthResponseInterface} from "../../../../../../shared/types/incomingsMonthResponse.interface";
import {IncomingsService} from "../../services/incomings.service";



@Injectable()
export class IncomingsEffect {

  currentMonthIncomings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCurrentMonthIncomingsAction),
      switchMap(() => {
        return this.incomingsService.getAccountIncomingsByMonthAndYear().pipe(
          map((currentMonthIncomings: IncomingsMonthResponseInterface[]) => {
            if (currentMonthIncomings == null) {
              currentMonthIncomings = [];
            }
            return getCurrentMonthIncomingsSuccessAction({monthIncomings: currentMonthIncomings});
          }),
        );
      })
    )
  )

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
