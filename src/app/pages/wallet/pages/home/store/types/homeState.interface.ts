import {UserAccountInterface} from "../../types/userAccount.interface";
import {OperationInterface} from "../../../../../../shared/types/operation.interface";
import {BackendErrorsInterface} from "../../../../../../shared/types/backendErrors.interface";
import {UsersDTOInterface} from "../../types/usersDTO.interface";

export interface HomeStateInterface {
  isLoading: boolean;
  currentUserAccounts: UserAccountInterface[];
  latestAccountMovements: OperationInterface[];
  users: UsersDTOInterface[];
  backendErrors:BackendErrorsInterface|null,
}
