import {createAction, props} from "@ngrx/store";
import {LoginRequestInterface} from "../../types/loginRequest.interface";
import {ActionTypes} from "../actionTypes";
import {CurrentUserInterface} from "../../../../../../shared/types/currentUser.interface";

export const loginAction = createAction(
  ActionTypes.LOGIN,
  props<{ request: LoginRequestInterface }>()
)

export const loginSuccessAction = createAction(
  ActionTypes.LOGIN_SUCCESS,
  props<{ currentUser: CurrentUserInterface }>()
)
