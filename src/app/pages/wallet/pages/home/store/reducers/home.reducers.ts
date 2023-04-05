import {HomeStateInterface} from "../types/homeState.interface";
import {Action, createReducer, on} from "@ngrx/store";
import {getUserAccountsAction, getUserAccountsSuccesAction} from "../actions/accounts.action";

const initialState: HomeStateInterface = {
  isLoading: false,
  currentUserAccounts: [],

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
)

export function homeReducers(state: HomeStateInterface, action: Action) {
  return homeReducer(state, action)
}
