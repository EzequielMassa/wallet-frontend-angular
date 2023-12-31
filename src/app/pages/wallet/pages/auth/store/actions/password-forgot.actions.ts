import {createAction, props} from "@ngrx/store";
import {ActionTypes} from "../actionTypes";
import {PasswordForgotRequestInterface} from "../../types/passwordForgotRequest.interface";
import {BackendErrorsInterface} from "../../../../../../shared/types/backendErrors.interface";
import {BackendMessagesInterface} from "../../../../../../shared/types/backendMessages.interface";


export const passwordForgotAction = createAction(
  ActionTypes.PASSWORD_FORGOT,
  props<{ request: PasswordForgotRequestInterface }>()
)

export const passwordForgotSuccessAction = createAction(
  ActionTypes.PASSWORD_FORGOT_SUCCESS,
  props<{ backendMessages: BackendMessagesInterface }>()
)

export const passwordForgotFailureAction = createAction(
  ActionTypes.PASSWORD_FORGOT_FAILURE,
  props<{ errors: BackendErrorsInterface }>()
)
