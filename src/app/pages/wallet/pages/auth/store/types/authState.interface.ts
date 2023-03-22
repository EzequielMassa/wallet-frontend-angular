import {CurrentUserInterface} from "../../../../../../shared/types/currentUser.interface";

export interface AuthStateInterface {
  isSubmitting: boolean;
  currentUser: CurrentUserInterface | null,
  isLoggedIn: boolean | null,
}
