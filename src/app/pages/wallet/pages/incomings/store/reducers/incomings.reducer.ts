import {Action, createReducer, on} from "@ngrx/store";
import {IncomingsStateInterface} from "../types/incomingsState.interface";
import {getCurrentYearIncomingsAction, getCurrentYearIncomingsSuccessAction} from "../actions/incomings.action";

const initialState: IncomingsStateInterface = {
  isLoading: false,
  currentYearIncomings: [],
}

const incomingsReducer = createReducer(
  initialState,
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
