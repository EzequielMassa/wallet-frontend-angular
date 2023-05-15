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
  getCurrentMonthExpensesAction,
  getCurrentMonthExpensesSuccessAction,
  getCurrentMonthIncomingsAction,
  getCurrentMonthIncomingsSuccessAction,
  getCurrentYearExpensesAction,
  getCurrentYearExpensesSuccessAction,
  getCurrentYearIncomingsAction,
  getCurrentYearIncomingsSuccessAction,
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
import {IncomingsMonthResponseInterface} from "../../../../../../shared/types/incomingsMonthResponse.interface";
import {ExpensesMonthResponseInterface} from "../../../../../../shared/types/ExpensesMonthResponse.interface";
import {updateProfileAction, updateProfileSuccessAction} from "../../../auth/store/actions/update-profile.action";
import {CurrentUserInterface} from "../../../../../../shared/types/currentUser.interface";

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

  currentMonthIncomings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCurrentMonthIncomingsAction),
      switchMap(() => {
        return this.accountService.getAccountIncomingsByMonthAndYear().pipe(
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

  currentMonthExpenses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCurrentMonthExpensesAction),
      switchMap(() => {
        return this.accountService.getAccountExpensesByMonthAndYear().pipe(
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

  currentYearIncomings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCurrentYearIncomingsAction),
      switchMap(() => {
        return this.accountService.getAccountIncomingsByYear().pipe(
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

  currentYearExpenses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCurrentYearExpensesAction),
      switchMap(() => {
        return this.accountService.getAccountExpensesByYear().pipe(
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


  updateProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateProfileAction),
      switchMap(({request}) => {
        return this.accountService.updateProfile(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            return updateProfileSuccessAction({currentUser});
          })
        );
      })
    )
  );


  constructor(private actions$: Actions, private accountService: AccountService, private store: Store, private persistanceService: PersistanceService) {
  }
}
