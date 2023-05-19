import {createAction, props} from "@ngrx/store";
import {ExpensesMonthResponseInterface} from "../../../../../../shared/types/ExpensesMonthResponse.interface";
import {ActionTypesExpenses} from "../types/ActionTypesExpenses";

//GET CURRENT MONTH EXPENSES ACTIONS
export const getCurrentMonthExpensesAction = createAction(
  ActionTypesExpenses.GET_CURRENT_MONTH_EXPENSES_ACTION,
)
export const getCurrentMonthExpensesSuccessAction = createAction(
  ActionTypesExpenses.GET_CURRENT_MONTH_EXPENSES_ACTION_SUCCESS,
  props<{ monthExpenses: ExpensesMonthResponseInterface[] }>()
)
export const getCurrentMonthExpensesFailureAction = createAction(
  ActionTypesExpenses.GET_CURRENT_MONTH_EXPENSES_ACTION_FAILURE
)

//GET CURRENT  YEAR EXPENSES ACTIONS
export const getCurrentYearExpensesAction = createAction(
  ActionTypesExpenses.GET_CURRENT_YEAR_EXPENSES_ACTION,
)
export const getCurrentYearExpensesSuccessAction = createAction(
  ActionTypesExpenses.GET_CURRENT_YEAR_EXPENSES_ACTION_SUCCESS,
  props<{ monthExpenses: ExpensesMonthResponseInterface[] }>()
)
export const getCurrentYearExpensesFailureAction = createAction(
  ActionTypesExpenses.GET_CURRENT_YEAR_EXPENSES_ACTION_FAILURE
)
