import {createFeatureSelector, createSelector} from "@ngrx/store";
import {AuthStateInterface} from "../types/authState.interface";

export const authFeatureSelector = createFeatureSelector<AuthStateInterface>('auth');

export const isSubmittingSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.isSubmitting
);


export const currentUserSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.currentUser
);

export const isLoggedInSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.isLoggedIn
);

export const backendErrorsSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.backendErrors
);

export const backendErrorsRegisterSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.backendErrorsRegister
);
export const backendErrorsPasswordForgotSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.backendErrorsPasswordForgot
);

export const backendMessagesSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.backenMessages
);

export const submitedSuccessfullySelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.passwordForgotSubmitedSuccessfully
);

export const passwordResetSubmitedSuccessfullySelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.passwordResetSubmitedSuccessfully
);
