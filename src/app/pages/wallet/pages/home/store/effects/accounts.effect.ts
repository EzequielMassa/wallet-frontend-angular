import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {map, switchMap} from "rxjs";
import {
  createNewDepositPaymentAction,
  createNewDepositPaymentSuccessAction,
  createNewTransferAction,
  createNewTransferSuccessAction,
  createNewUserAccountAction,
  createNewUserAccountSuccessAction,
  getLatestAccountMovementsAction,
  getLatestAccountMovementsSuccessAction,
  getUserAccountsAction,
  getUserAccountsSuccesAction
} from "../actions/accounts.action";
import {AccountService} from "../../services/account.service";
import {UserAccountInterface} from "../../types/userAccount.interface";
import {Store} from "@ngrx/store";
import {OperationInterface} from "../../../../../../shared/types/operation.interface";
import {PersistanceService} from "../../../../../../shared/services/persistance.service";
import {getCurrentMonthIncomingsAction} from "../../../incomings/store/actions/incomings.action";
import {getCurrentMonthExpensesAction} from "../../../expenses/store/actions/expenses.action";

@Injectable()
export class AccountsEffect {
  accounts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUserAccountsAction),
      switchMap(() => {
        return this.accountService.getUserAccounts().pipe(
          map((currentUserAccounts: UserAccountInterface[]) => {
            return getUserAccountsSuccesAction({currentUserAccounts});
          }),
        );
      })
    )
  )

  createAccounts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createNewUserAccountAction),
      switchMap(() => {
        return this.accountService.createNewUserAccount().pipe(
          map(() => {
            this.store.dispatch(getUserAccountsAction())
            const activeAccount = parseInt(this.persistanceService.get('activeAccount'))
            this.store.dispatch(getLatestAccountMovementsAction({activeAccount: activeAccount}))
            return createNewUserAccountSuccessAction();
          })
        );
      })
    )
  )

  depositPayment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createNewDepositPaymentAction),
      switchMap(({request}) => {
        return this.accountService.createDepositPayment(request).pipe(
          map(() => {
            this.store.dispatch(getUserAccountsAction())
            const activeAccount = parseInt(this.persistanceService.get('activeAccount'))
            this.store.dispatch(getLatestAccountMovementsAction({activeAccount: activeAccount}))
            return createNewDepositPaymentSuccessAction({request});
          })
        );
      })
    )
  )


  transfer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createNewTransferAction),
      switchMap(({request}) => {
        return this.accountService.createTransfer(request).pipe(
          map(() => {
            this.store.dispatch(getUserAccountsAction())
            const activeAccount = parseInt(this.persistanceService.get('activeAccount'))
            this.store.dispatch(getLatestAccountMovementsAction({activeAccount: activeAccount}))
            return createNewTransferSuccessAction({request});
          })
        );
      })
    )
  )

  latestMovements$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getLatestAccountMovementsAction),
      switchMap(({activeAccount}) => {
        return this.accountService.getLatestAccountMovements(activeAccount).pipe(
          map((latestMovements: OperationInterface[]) => {
            this.store.dispatch(getCurrentMonthIncomingsAction())
            this.store.dispatch(getCurrentMonthExpensesAction())
            return getLatestAccountMovementsSuccessAction({latestMovements});
          }),
        );
      })
    )
  )
  constructor(private actions$: Actions, private accountService: AccountService, private store: Store, private persistanceService: PersistanceService) {
  }
}
