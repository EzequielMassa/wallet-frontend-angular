import {HomeStateInterface} from "../types/homeState.interface";
import {Action, createReducer, on} from "@ngrx/store";
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
  getCurrentYearIncomingsAction,
  getCurrentYearIncomingsSuccessAction,
  getLatestAccountMovementsAction,
  getLatestAccountMovementsSuccessAction,
  getUserAccountsAction,
  getUserAccountsSuccesAction
} from "../actions/accounts.action";

const initialState: HomeStateInterface = {
  isLoading: false,
  currentUserAccounts: [],
  latestAccountMovements: [],
  currentMonthIncomings: [],
  currentMonthExpenses: [],
  currentYearIncomingss: []
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
  on(
    getCurrentMonthIncomingsAction, (state): HomeStateInterface => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    getCurrentMonthIncomingsSuccessAction, (state, action
    ): HomeStateInterface => ({
      ...state,
      isLoading: false,
      currentMonthIncomings: action.monthIncomings
    })
  ),
  on(
    getCurrentMonthExpensesAction, (state): HomeStateInterface => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    getCurrentMonthExpensesSuccessAction, (state, action
    ): HomeStateInterface => ({
      ...state,
      isLoading: false,
      currentMonthExpenses: action.monthExpenses
    })
  ),
  on(
    getCurrentYearIncomingsAction, (state): HomeStateInterface => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    getCurrentYearIncomingsSuccessAction, (state, action
    ): HomeStateInterface => ({
      ...state,
      isLoading: false,
      currentYearIncomingss: action.monthIncomings
    })
  ),
)

export function homeReducers(state: HomeStateInterface, action: Action) {
  return homeReducer(state, action)
}
