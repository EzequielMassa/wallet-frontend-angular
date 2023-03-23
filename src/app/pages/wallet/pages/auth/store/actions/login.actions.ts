import {createAction} from "@ngrx/store";
import {LoginRequestInterface} from "../../types/loginRequest.interface";

export const loginAction = createAction(
  ActionTypes.LOGIN,
  props<{ request: LoginRequestInterface }>()
)

export const loginSuccessAction = createAction(
  ActionTypes.LOGIN_SUCCESS,
  props<{ request: LoginRequestInterface }>()
)
