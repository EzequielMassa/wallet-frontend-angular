import {AuthStateInterface} from "../types/authState.interface";
import {Action, createReducer, on} from "@ngrx/store";
import {registerAction, registerSuccessAction} from "../actions/register.action";
import {loginAction, loginSuccessAction} from "../actions/login.actions";
import {logoutAction, logoutSuccessAction} from "../actions/logout.actions";
import {updateProfileAction, updateProfileSuccessAction} from "../actions/update-profile.action";
import {
  passwordForgotAction,
  passwordForgotFailureAction,
  passwordForgotSuccessAction
} from "../actions/password-forgot.actions";

const initialState: AuthStateInterface = {
  isSubmitting: false,
  currentUser: null,
  isLoggedIn: null,
  backendErrors: null
}

const authReducer = createReducer(
  initialState,
  on(
    registerAction, (state): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
      backendErrors: null
    })
  ),
  on(
    registerSuccessAction, (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      isLoggedIn: false,
      currentUser: action.currentUser,
    })
  ),
  on(
    loginAction, (state): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
      backendErrors: null
    })
  ),
  on(
    loginSuccessAction, (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      isLoggedIn: true,
      currentUser: action.currentUser,
    })
  ),
  on(
    logoutAction, (state): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
      backendErrors: null
    })
  ),
  on(
    logoutSuccessAction, (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      isLoggedIn: false,
      currentUser: null,
    })
  ),
  on(
    passwordForgotAction, (state): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
      backendErrors: null
    })
  ),
  on(
    passwordForgotSuccessAction, (state): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      backendErrors: null
    })
  ),
  on(
    passwordForgotFailureAction, (state,action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      backendErrors: action.errors
    })
  ),

  on(
    updateProfileAction, (state): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
    })
  ),
  on(
    updateProfileSuccessAction, (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      currentUser: action.currentUser,

    })
  ),
)

export function reducers(state: AuthStateInterface, action: Action) {
  return authReducer(state, action)
}
