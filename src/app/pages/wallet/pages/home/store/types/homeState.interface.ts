import {UserAccountInterface} from "../../types/userAccount.interface";
import {OperationInterface} from "../../../../../../shared/types/operation.interface";
import {BackendErrorsInterface} from "../../../../../../shared/types/backendErrors.interface";

export interface HomeStateInterface {
  isLoading: boolean;
  currentUserAccounts: UserAccountInterface[];
  latestAccountMovements: OperationInterface[];
  backendErrors:BackendErrorsInterface|null,
}
