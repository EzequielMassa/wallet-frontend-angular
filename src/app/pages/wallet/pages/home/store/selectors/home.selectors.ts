import {createFeatureSelector, createSelector} from "@ngrx/store";
import {HomeStateInterface} from "../types/homeState.interface";

export const homeFeatureSelector = createFeatureSelector<
  HomeStateInterface>('home')

export const isLoadingSelector = createSelector(
  homeFeatureSelector,
  (homeState: HomeStateInterface) => homeState.isLoading
)

export const userAccountsSelector = createSelector(
  homeFeatureSelector,
  (homeState: HomeStateInterface) => homeState.currentUserAccounts
);

export const latestAccountMovementsSelector = createSelector(
  homeFeatureSelector,
  (homeState: HomeStateInterface) => homeState.latestAccountMovements
);
