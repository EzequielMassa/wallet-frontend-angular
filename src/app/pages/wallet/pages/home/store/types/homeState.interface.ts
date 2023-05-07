import {UserAccountInterface} from "../../types/userAccount.interface";
import {OperationInterface} from "../../../../../../shared/types/operation.interface";
import {IncomingsMonthResponseInterface} from "../../../../../../shared/types/incomingsMonthResponse.interface";
import {ExpensesMonthResponseInterface} from "../../../../../../shared/types/ExpensesMonthResponse.interface";

export interface HomeStateInterface {
  isLoading: boolean;
  currentUserAccounts: UserAccountInterface[];
  latestAccountMovements: OperationInterface[];
  currentMonthIncomings: IncomingsMonthResponseInterface[];
  currentMonthExpenses: ExpensesMonthResponseInterface[];
  currentYearIncomings: IncomingsMonthResponseInterface[];
  currentYearExpenses: ExpensesMonthResponseInterface[];
}
