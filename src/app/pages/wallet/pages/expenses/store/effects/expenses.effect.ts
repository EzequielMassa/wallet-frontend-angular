import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {
  getCurrentMonthExpensesAction,
  getCurrentMonthExpensesSuccessAction,
  getCurrentYearExpensesAction, getCurrentYearExpensesSuccessAction
} from "../actions/expenses.action";
import {map, switchMap} from "rxjs";
import {ExpensesMonthResponseInterface} from "../../../../../../shared/types/ExpensesMonthResponse.interface";
import {ExpensesService} from "../../services/expenses.service";

@Injectable()
export class ExpensesEffect {

  currentMonthExpenses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCurrentMonthExpensesAction),
      switchMap(() => {
        return this.expensesService.getAccountExpensesByMonthAndYear().pipe(
          map((currentMonthExpenses: ExpensesMonthResponseInterface[]) => {
            if (currentMonthExpenses == null) {
              currentMonthExpenses = [];
            }
            return getCurrentMonthExpensesSuccessAction({monthExpenses: currentMonthExpenses});
          })
        );
      })
    )
  )

  currentYearExpenses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCurrentYearExpensesAction),
      switchMap(() => {
        return this.expensesService.getAccountExpensesByYear().pipe(
          map((currentMonthExpenses: ExpensesMonthResponseInterface[]) => {
            if (currentMonthExpenses == null) {
              currentMonthExpenses = [];
            }
            return getCurrentYearExpensesSuccessAction({monthExpenses: currentMonthExpenses});
          }),
        );
      })
    )
  )

  constructor(private actions$: Actions, private expensesService: ExpensesService) {
  }
}
