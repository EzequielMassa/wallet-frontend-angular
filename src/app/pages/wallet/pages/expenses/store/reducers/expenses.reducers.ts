import {ExpensesStateInterface} from "../types/expensesState.interface";
import {Action, createReducer, on} from "@ngrx/store";
import {
  getCurrentMonthExpensesAction,
  getCurrentMonthExpensesSuccessAction,
  getCurrentYearExpensesAction,
  getCurrentYearExpensesSuccessAction
} from "../actions/expenses.action";

const initialState: ExpensesStateInterface = {
  isLoading: false,
  currentMonthExpenses: [],
  currentYearExpenses: []
}

const expensesReducer = createReducer(
  initialState,

on(
  getCurrentMonthExpensesAction, (state): ExpensesStateInterface => ({
    ...state,
    isLoading: true,
  })
),
  on(
    getCurrentMonthExpensesSuccessAction, (state, action
    ): ExpensesStateInterface => ({
      ...state,
      isLoading: false,
      currentMonthExpenses: action.monthExpenses
    })
  ),
  on(
    getCurrentYearExpensesAction, (state): ExpensesStateInterface => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    getCurrentYearExpensesSuccessAction, (state, action
    ): ExpensesStateInterface => ({
      ...state,
      isLoading: false,
      currentYearExpenses: action.monthExpenses
    })
  ),
)
export function expensesReducers(state: ExpensesStateInterface, action: Action) {
  return expensesReducer(state, action)
}
