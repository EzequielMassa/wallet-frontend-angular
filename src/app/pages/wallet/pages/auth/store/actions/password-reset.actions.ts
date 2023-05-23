import {createAction, props} from "@ngrx/store";
import {ActionTypes} from "../actionTypes";
import {PasswordResetRequestInterface} from "../../types/passwordResetRequest.interface";
import {BackendErrorsInterface} from "../../../../../../shared/types/backendErrors.interface";
import {BackendMessagesInterface} from "../../../../../../shared/types/backendMessages.interface";

export const passwordResetAction = createAction(
  ActionTypes.PASSWORD_RESET,
  props<{ request: PasswordResetRequestInterface }>()
)

export const passwordResetSuccessAction = createAction(
  ActionTypes.PASSWORD_RESET_SUCCESS,
  props<{ backendMessage: BackendMessagesInterface }>()
)

export const passwordResetFailureAction = createAction(
  ActionTypes.PASSWORD_RESET_FAILURE,
  props<{ errors: BackendErrorsInterface }>()
)
