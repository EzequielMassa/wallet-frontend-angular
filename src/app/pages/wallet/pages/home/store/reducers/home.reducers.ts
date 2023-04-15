import {HomeStateInterface} from "../types/homeState.interface";
import {Action, createReducer, on} from "@ngrx/store";
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

const initialState: HomeStateInterface = {
  isLoading: false,
  currentUserAccounts: [],
  latestAccountMovements: []
}


const homeReducer = createReducer(
  initialState,
  on(
    getUserAccountsAction, (state): HomeStateInterface => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    getUserAccountsSuccesAction, (state, action): HomeStateInterface => ({
      ...state,
      isLoading: false,
      currentUserAccounts: action.currentUserAccounts,
    })
  ),
  on(
    createNewUserAccountAction, (state): HomeStateInterface => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    createNewUserAccountSuccessAction, (state, action): HomeStateInterface => ({
      ...state,
      isLoading: false,
    })
  ),
  on(
    createNewDepositPaymentAction, (state): HomeStateInterface => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    createNewDepositPaymentSuccessAction, (state, action): HomeStateInterface => ({
      ...state,
      isLoading: false,
    })
  ),
  on(
    createNewTransferAction, (state): HomeStateInterface => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    createNewTransferSuccessAction, (state, action): HomeStateInterface => ({
      ...state,
      isLoading: false,
    })
  ),
  on(
    getLatestAccountMovementsAction, (state): HomeStateInterface => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    getLatestAccountMovementsSuccessAction, (state, action): HomeStateInterface => ({
      ...state,
      isLoading: false,
      latestAccountMovements: action.latestMovements,
    })
  ),
)

export function homeReducers(state: HomeStateInterface, action: Action) {
  return homeReducer(state, action)
}
