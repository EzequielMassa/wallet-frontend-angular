import { Action, createReducer, on } from '@ngrx/store';
import {
  loginAction,
  loginFailureAction,
  loginSuccessAction,
} from '../actions/login.actions';
import { logoutAction, logoutSuccessAction } from '../actions/logout.actions';
import {
  passwordForgotAction,
  passwordForgotFailureAction,
  passwordForgotSuccessAction,
} from '../actions/password-forgot.actions';
import {
  passwordResetAction,
  passwordResetFailureAction,
  passwordResetSuccessAction,
} from '../actions/password-reset.actions';
import {
  registerAction, registerFailureAction,
  registerSuccessAction,
} from '../actions/register.action';
import {
  updateProfileAction,
  updateProfileSuccessAction,
} from '../actions/update-profile.action';
import { AuthStateInterface } from '../types/authState.interface';

const initialState: AuthStateInterface = {
  isSubmitting: false,
  currentUser: null,
  isLoggedIn: null,
  backendErrors: null,
  backenMessages: null,
  backendErrorsPasswordForgot: null,
  passwordForgotSubmitedSuccessfully: false,
  passwordResetSubmitedSuccessfully: false,
};

const authReducer = createReducer(
  initialState,
  on(
    registerAction,
    (state): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
      backendErrors: null,
      backendErrorsPasswordForgot: null,
    })
  ),
  on(
    registerSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      isLoggedIn: false,
      backendErrors: null,
      backendErrorsPasswordForgot: null,
      currentUser: action.currentUser,
    })
  ),
  on(
    registerFailureAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      isLoggedIn: false,
      backendErrors: action.errors,
      backendErrorsPasswordForgot: null,
    })
  ),
  on(
    loginAction,
    (state): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
      backendErrors: null,
      backendErrorsPasswordForgot: null,
    })
  ),
  on(
    loginSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      isLoggedIn: true,
      backendErrors: null,
      backendErrorsPasswordForgot: null,
      currentUser: action.currentUser,
    })
  ),
  on(
    loginFailureAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      isLoggedIn: false,
      backendErrors: action.errors,
      backendErrorsPasswordForgot: null,
    })
  ),
  on(
    logoutAction,
    (state): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
      backendErrors: null,
      backendErrorsPasswordForgot: null,
    })
  ),
  on(
    logoutSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      isLoggedIn: false,
      currentUser: null,
    })
  ),
  on(
    passwordForgotAction,
    (state): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
      backendErrors: null,
      backendErrorsPasswordForgot: null,
      passwordForgotSubmitedSuccessfully: false,
    })
  ),
  on(
    passwordForgotSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      backendErrors: null,
      backendErrorsPasswordForgot: null,
      passwordForgotSubmitedSuccessfully: true,
      backenMessages: action.backendMessages,
    })
  ),
  on(
    passwordForgotFailureAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      backendErrors: null,
      backendErrorsPasswordForgot: action.errors,
      passwordForgotSubmitedSuccessfully: false,
    })
  ),
  on(
    passwordResetAction,
    (state): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
      backendErrors: null,
      backendErrorsPasswordForgot: null,
      passwordResetSubmitedSuccessfully: false,
    })
  ),
  on(
    passwordResetSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      backendErrors: null,
      backendErrorsPasswordForgot: null,
      passwordResetSubmitedSuccessfully: true,
      backenMessages: action.backendMessage,
    })
  ),
  on(
    passwordResetFailureAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      passwordResetSubmitedSuccessfully: false,
      backendErrors: action.errors,
    })
  ),
  on(
    updateProfileAction,
    (state): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
    })
  ),
  on(
    updateProfileSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      currentUser: action.currentUser,
    })
  )
);

export function reducers(state: AuthStateInterface, action: Action) {
  return authReducer(state, action);
}
