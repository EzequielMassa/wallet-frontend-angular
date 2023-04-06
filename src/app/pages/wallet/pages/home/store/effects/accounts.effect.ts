import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {map, switchMap} from "rxjs";
import {
  createNewUserAccountAction,
  createNewUserAccountSuccessAction,
  getUserAccountsAction,
  getUserAccountsSuccesAction
} from "../actions/accounts.action";
import {AccountService} from "../../services/account.service";
import {UserAccountInterface} from "../../types/userAccount.interface";
import {Store} from "@ngrx/store";

@Injectable()
export class AccountsEffect {
  accounts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUserAccountsAction),
      switchMap(() => {
        return this.accountService.getUserAccounts().pipe(
          map((currentUserAccounts: UserAccountInterface[]) => {
            return getUserAccountsSuccesAction({currentUserAccounts});
          })
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
            return createNewUserAccountSuccessAction();
          })
        );
      })
    )
  )

  constructor(private actions$: Actions, private accountService: AccountService, private store: Store) {
  }
}
