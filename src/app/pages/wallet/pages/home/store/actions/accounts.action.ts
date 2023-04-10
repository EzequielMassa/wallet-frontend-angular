import {createAction, props} from "@ngrx/store";
import {ActionTypesHome} from "../types/ActionTypesHome";
import {UserAccountInterface} from "../../types/userAccount.interface";
import {DepositPaymentInterface} from "../../types/DepositPayment.interface";


//GET ACCOUNTS ACTIONS
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


//CREATE ACCOUNTS ACTION
export const createNewUserAccountAction = createAction(
  ActionTypesHome.CREATE_NEW_ACCOUNT,
)

export const createNewUserAccountSuccessAction = createAction(
  ActionTypesHome.CREATE_NEW_ACCOUNT_SUCCESS,
)

export const createNewUserAccountFailureAction = createAction(
  ActionTypesHome.CREATE_NEW_ACCOUNT_FAILURE
)

//CREATE NEW DEPOSIT / PAYMENT ACTIONS
export const createNewDepositPaymentAction = createAction(
  ActionTypesHome.CREATE_NEW_DEPOSIT_PAYMENT,
  props<{ request: DepositPaymentInterface }>()
)

export const createNewDepositPaymentSuccessAction = createAction(
  ActionTypesHome.CREATE_NEW_DEPOSIT_PAYMENT_SUCCESS,
  props<{ request: DepositPaymentInterface }>()
)

export const createNewDepositPaymentFailureAction = createAction(
  ActionTypesHome.CREATE_NEW_DEPOSIT_PAYMENT_FAILURE
)
