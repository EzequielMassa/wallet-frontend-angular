import {Action, createReducer, on} from "@ngrx/store";
import {IncomingsStateInterface} from "../types/incomingsState.interface";
import {
  getCurrentMonthIncomingsAction, getCurrentMonthIncomingsSuccessAction,
  getCurrentYearIncomingsAction,
  getCurrentYearIncomingsSuccessAction
} from "../actions/incomings.action";

const initialState: IncomingsStateInterface = {
  isLoading: false,
  currentMonthIncomings: [],
  currentYearIncomings: [],
}

const incomingsReducer = createReducer(
  initialState,
  on(
    getCurrentMonthIncomingsAction, (state): IncomingsStateInterface => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    getCurrentMonthIncomingsSuccessAction, (state, action
    ): IncomingsStateInterface => ({
      ...state,
      isLoading: false,
      currentMonthIncomings: action.monthIncomings
    })
  ),
  on(
    getCurrentYearIncomingsAction, (state): IncomingsStateInterface => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    getCurrentYearIncomingsSuccessAction, (state, action
    ): IncomingsStateInterface => ({
      ...state,
      isLoading: false,
      currentYearIncomings: action.monthIncomings
    })
  ),
  )

export function incomingsReducers(state: IncomingsStateInterface, action: Action) {
  return incomingsReducer(state, action)
}
