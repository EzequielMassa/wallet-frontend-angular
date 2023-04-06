import {createAction, props} from "@ngrx/store";
import {ActionTypesHome} from "../types/ActionTypesHome";
import {UserAccountInterface} from "../../types/userAccount.interface";

export const getUserAccountsAction = createAction(
  ActionTypesHome.GETACCOUNTS
)

export const getUserAccountsSuccesAction = createAction(
  ActionTypesHome.GETACCOUNTS_SUCCESS,
  props<{ currentUserAccounts: UserAccountInterface[] }>()
)

export const getUserAccountsFailureAction = createAction(
  ActionTypesHome.GETACCOUNTS_FAILURE
)

export const createNewUserAccountAction = createAction(
  ActionTypesHome.CREATE_NEW_ACCOUNT,
)

export const createNewUserAccountSuccessAction = createAction(
  ActionTypesHome.CREATE_NEW_ACCOUNT_SUCCESS,
)

export const createNewUserAccountFailureAction = createAction(
  ActionTypesHome.CREATE_NEW_ACCOUNT_FAILURE
)
