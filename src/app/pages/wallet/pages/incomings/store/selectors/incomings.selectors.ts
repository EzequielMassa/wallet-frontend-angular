import {createFeatureSelector, createSelector} from "@ngrx/store";
import {IncomingsStateInterface} from "../types/incomingsState.interface";


export const incomingsFeatureSelector = createFeatureSelector<
  IncomingsStateInterface>('incomings');

export const isLoadingSelector = createSelector(
  incomingsFeatureSelector,
  (incomingsState: IncomingsStateInterface) => incomingsState.isLoading
)

export const currentYearIncomingsSelector = createSelector(
  incomingsFeatureSelector,
  (incomingsState: IncomingsStateInterface) => incomingsState.currentYearIncomings
);
