import {createFeatureSelector, createSelector} from "@ngrx/store";
import {ExpensesStateInterface} from "../types/expensesState.interface";

export const expensesFeatureSelector = createFeatureSelector<
  ExpensesStateInterface>('expenses')

export const isLoadingSelector = createSelector(
  expensesFeatureSelector,
  (expensesState: ExpensesStateInterface) => expensesState.isLoading
)

export const currentMonthExpensesSelector = createSelector(
  expensesFeatureSelector,
  (expensesState: ExpensesStateInterface) => expensesState.currentMonthExpenses
);


export const currentYearExpensesSelector = createSelector(
  expensesFeatureSelector,
  (expensesState: ExpensesStateInterface) => expensesState.currentYearExpenses
);
