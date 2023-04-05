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
