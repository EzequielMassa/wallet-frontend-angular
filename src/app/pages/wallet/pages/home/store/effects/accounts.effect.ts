import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { NewAccountBadgeService } from '../../../../../../shared/services/new-account-badge.service';
import { PersistanceService } from '../../../../../../shared/services/persistance.service';
import { OperationInterface } from '../../../../../../shared/types/operation.interface';
import { getCurrentMonthExpensesAction } from '../../../expenses/store/actions/expenses.action';
import { getCurrentMonthIncomingsAction } from '../../../incomings/store/actions/incomings.action';
import { AccountService } from '../../services/account.service';
import { UserAccountInterface } from '../../types/userAccount.interface';
import { UsersDTOInterface } from '../../types/usersDTO.interface';
import {
  createNewDepositPaymentAction,
  createNewDepositPaymentFailureAction,
  createNewDepositPaymentSuccessAction,
  createNewTransferAction,
  createNewTransferFailureAction,
  createNewTransferSuccessAction,
  createNewUserAccountAction,
  createNewUserAccountSuccessAction,
  getAllUsers,
  getAllUsersSuccesAction,
  getLatestAccountMovementsAction,
  getLatestAccountMovementsSuccessAction,
  getUserAccountsAction,
  getUserAccountsSuccesAction,
} from '../actions/accounts.action';

@Injectable()
export class AccountsEffect {
  accounts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUserAccountsAction),
      switchMap(() => {
        return this.accountService.getUserAccounts().pipe(
          map((currentUserAccounts: UserAccountInterface[]) => {
            return getUserAccountsSuccesAction({ currentUserAccounts });
          })
        );
      })
    )
  );

  createAccounts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createNewUserAccountAction),
      switchMap(() => {
        return this.accountService.createNewUserAccount().pipe(
          map(() => {
            this.store.dispatch(getUserAccountsAction());
            const activeAccount = parseInt(
              this.persistanceService.get('activeAccount')
            );
            this.store.dispatch(
              getLatestAccountMovementsAction({ activeAccount: activeAccount })
            );
            return createNewUserAccountSuccessAction();
          })
        );
      })
    )
  );

  depositPayment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createNewDepositPaymentAction),
      switchMap(({ request }) => {
        return this.accountService.createDepositPayment(request).pipe(
          map(() => {
            this.store.dispatch(getUserAccountsAction());
            const activeAccount = parseInt(
              this.persistanceService.get('activeAccount')
            );
            this.store.dispatch(
              getLatestAccountMovementsAction({ activeAccount: activeAccount })
            );
            return createNewDepositPaymentSuccessAction({ request });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            this.showFailure(errorResponse.error.message);
            return of(
              createNewDepositPaymentFailureAction({
                errors: errorResponse.error,
              })
            );
          })
        );
      })
    )
  );

  transfer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createNewTransferAction),
      switchMap(({ request }) => {
        return this.accountService.createTransfer(request).pipe(
          map(() => {
            this.store.dispatch(getUserAccountsAction());
            const activeAccount = parseInt(
              this.persistanceService.get('activeAccount')
            );
            this.store.dispatch(
              getLatestAccountMovementsAction({ activeAccount: activeAccount })
            );
            return createNewTransferSuccessAction({ request });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            this.showFailure(errorResponse.error.message);
            return of(
              createNewTransferFailureAction({ errors: errorResponse.error })
            );
          })
        );
      })
    )
  );

  latestMovements$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getLatestAccountMovementsAction),
      switchMap(({ activeAccount }) => {
        return this.accountService
          .getLatestAccountMovements(activeAccount)
          .pipe(
            map((latestMovements: OperationInterface[]) => {
              this.store.dispatch(getCurrentMonthIncomingsAction());
              this.store.dispatch(getCurrentMonthExpensesAction());
              return getLatestAccountMovementsSuccessAction({
                latestMovements,
              });
            })
          );
      })
    )
  );

  users$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllUsers),
      switchMap(() => {
        return this.accountService.getAllUsers().pipe(
          map((users: UsersDTOInterface[]) => {
            return getAllUsersSuccesAction({ users });
          })
        );
      })
    )
  );

  accountCreated$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createNewUserAccountSuccessAction),
        tap(() => {
          this.showSuccess('New account created successfully!');
          this.badgeService.setbadgeState(false);
        })
      ),
    { dispatch: false }
  );

  depositedPaid$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createNewDepositPaymentSuccessAction),
        tap(() => {
          this.showSuccess('Transaction successful!');
        })
      ),
    { dispatch: false }
  );

  transfered$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createNewTransferSuccessAction),
        tap(() => {
          this.showSuccess('Transfer succesful!');
        })
      ),
    { dispatch: false }
  );

  showSuccess(title: string) {
    this.toastr.success('', title, { positionClass: 'toast-bottom-right' });
  }
  showFailure(title: string) {
    this.toastr.error('', title, { positionClass: 'toast-bottom-right' });
  }
  constructor(
    private actions$: Actions,
    private accountService: AccountService,
    private store: Store,
    private persistanceService: PersistanceService,
    private toastr: ToastrService,
    private badgeService: NewAccountBadgeService
  ) {}
}
