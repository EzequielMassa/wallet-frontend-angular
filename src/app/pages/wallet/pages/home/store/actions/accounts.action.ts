import {createAction, props} from "@ngrx/store";
import {ActionTypesHome} from "../types/ActionTypesHome";
import {UserAccountInterface} from "../../types/userAccount.interface";
import {DepositPaymentInterface} from "../../types/DepositPayment.interface";
import {TransferInterface} from "../../types/Transfer.interface";
import {OperationInterface} from "../../../../../../shared/types/operation.interface";
import {BackendErrorsInterface} from "../../../../../../shared/types/backendErrors.interface";
import {UsersDTOInterface} from "../../types/usersDTO.interface";


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
  ActionTypesHome.CREATE_NEW_DEPOSIT_PAYMENT_FAILURE,
  props<{ errors: BackendErrorsInterface }>()
)

//CREATE NEW TRANSFER ACTIONS
export const createNewTransferAction = createAction(
  ActionTypesHome.CREATE_NEW_TRANSFER,
  props<{ request: TransferInterface }>()
)
export const createNewTransferSuccessAction = createAction(
  ActionTypesHome.CREATE_NEW_TRANSFER_SUCCESS,
  props<{ request: TransferInterface }>()
)
export const createNewTransferFailureAction = createAction(
  ActionTypesHome.CREATE_NEW_TRANSFER_FAILURE,
  props<{ errors: BackendErrorsInterface }>()
)

//GET LATEST ACCOUNT MOVEMENTS
export const getLatestAccountMovementsAction = createAction(
  ActionTypesHome.GETLATESTACCOUNTMOVEMENTS,
  props<{ activeAccount: number }>()
)
export const getLatestAccountMovementsSuccessAction = createAction(
  ActionTypesHome.GETLATESTACCOUNTMOVEMENTS_SUCCESS,
  props<{ latestMovements: OperationInterface[] }>()
)
export const getLatestAccountMovementsFailureAction = createAction(
  ActionTypesHome.GETLATESTACCOUNTMOVEMENTS_FAILURE
)


//GET ALL USERS
export const getAllUsers = createAction(
  ActionTypesHome.GET_ALL_USERS,
)
export const getAllUsersSuccesAction = createAction(
  ActionTypesHome.GET_ALL_USERS_SUCCESS,
  props<{ users: UsersDTOInterface[] }>()
)
export const getAllUsersFailureAction = createAction(
  ActionTypesHome.GET_ALL_USERS_FAILURE
)
