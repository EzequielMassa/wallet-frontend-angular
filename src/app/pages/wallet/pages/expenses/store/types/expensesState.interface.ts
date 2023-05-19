import {ExpensesMonthResponseInterface} from "../../../../../../shared/types/ExpensesMonthResponse.interface";

export interface ExpensesStateInterface {
  isLoading: boolean;
  currentMonthExpenses: ExpensesMonthResponseInterface[];
  currentYearExpenses: ExpensesMonthResponseInterface[];
}
