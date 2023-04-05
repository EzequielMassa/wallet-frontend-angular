import {UserAccountInterface} from "../../types/userAccount.interface";

export interface HomeStateInterface {
  isLoading: boolean;
  currentUserAccounts: UserAccountInterface[]
}
