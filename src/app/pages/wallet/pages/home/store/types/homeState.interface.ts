import {UserAccountInterface} from "../../types/userAccount.interface";
import {OperationInterface} from "../../../../../../shared/types/operation.interface";

export interface HomeStateInterface {
  isLoading: boolean;
  currentUserAccounts: UserAccountInterface[];
  latestAccountMovements: OperationInterface[];
}
