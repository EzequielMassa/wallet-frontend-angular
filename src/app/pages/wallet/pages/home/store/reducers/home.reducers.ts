import {HomeStateInterface} from "../types/homeState.interface";
import {Action, createReducer, on} from "@ngrx/store";
import {
  createNewDepositPaymentAction, createNewDepositPaymentFailureAction,
  createNewDepositPaymentSuccessAction,
  createNewTransferAction, createNewTransferFailureAction,
  createNewTransferSuccessAction,
  createNewUserAccountAction,
  createNewUserAccountSuccessAction,
  getLatestAccountMovementsAction,
  getLatestAccountMovementsSuccessAction,
  getUserAccountsAction,
  getUserAccountsSuccesAction
} from "../actions/accounts.action";

const initialState: HomeStateInterface = {
  isLoading: false,
  currentUserAccounts: [],
  latestAccountMovements: [],
  backendErrors: null
}


const homeReducer = createReducer(
  initialState,
  on(
    getUserAccountsAction, (state): HomeStateInterface => ({
      ...state,
      isLoading: true,
      backendErrors: null
    })
  ),
  on(
    getUserAccountsSuccesAction, (state, action): HomeStateInterface => ({
      ...state,
      isLoading: false,
      currentUserAccounts: action.currentUserAccounts,
      backendErrors: null
    })
  ),
  on(
    createNewUserAccountAction, (state): HomeStateInterface => ({
      ...state,
      isLoading: true,
      backendErrors: null
    })
  ),
  on(
    createNewUserAccountSuccessAction, (state, action): HomeStateInterface => ({
      ...state,
      isLoading: false,
      backendErrors: null
    })
  ),
  on(
    createNewDepositPaymentAction, (state): HomeStateInterface => ({
      ...state,
      isLoading: true,
      backendErrors: null
    })
  ),
  on(
    createNewDepositPaymentSuccessAction, (state): HomeStateInterface => ({
      ...state,
      isLoading: false,
      backendErrors: null
    })
  ),
  on(
    createNewDepositPaymentFailureAction, (state, action): HomeStateInterface => ({
      ...state,
      isLoading: false,
      backendErrors: action.errors
    })
  ),
  on(
    createNewTransferAction, (state): HomeStateInterface => ({
      ...state,
      isLoading: true,
      backendErrors: null
    })
  ),
  on(
    createNewTransferSuccessAction, (state, action): HomeStateInterface => ({
      ...state,
      isLoading: false,
      backendErrors: null
    })
  ),
  on(
    createNewTransferFailureAction, (state, action): HomeStateInterface => ({
      ...state,
      isLoading: false,
      backendErrors: action.errors
    })
  ),
  on(
    getLatestAccountMovementsAction, (state): HomeStateInterface => ({
      ...state,
      isLoading: true,
      backendErrors: null
    })
  ),
  on(
    getLatestAccountMovementsSuccessAction, (state, action): HomeStateInterface => ({
      ...state,
      isLoading: false,
      latestAccountMovements: action.latestMovements,
      backendErrors: null
    })
  ),
)

export function homeReducers(state: HomeStateInterface, action: Action) {
  return homeReducer(state, action)
}
