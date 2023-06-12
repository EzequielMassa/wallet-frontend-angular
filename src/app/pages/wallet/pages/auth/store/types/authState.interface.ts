import {CurrentUserInterface} from "../../../../../../shared/types/currentUser.interface";
import {BackendErrorsInterface} from "../../../../../../shared/types/backendErrors.interface";
import {BackendMessagesInterface} from "../../../../../../shared/types/backendMessages.interface";

export interface AuthStateInterface {
  isSubmitting: boolean;
  currentUser: CurrentUserInterface | null,
  isLoggedIn: boolean | null,
  backendErrors:BackendErrorsInterface|null,
  backendErrorsRegister:BackendErrorsInterface|null,
  backendErrorsPasswordForgot:BackendErrorsInterface|null,
  backenMessages:BackendMessagesInterface|null
  passwordForgotSubmitedSuccessfully:boolean;
  passwordResetSubmitedSuccessfully:boolean;
}
