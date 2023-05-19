import {createAction, props} from "@ngrx/store";
import {IncomingsMonthResponseInterface} from "../../../../../../shared/types/incomingsMonthResponse.interface";
import {ActionsTypesIncomings} from "../types/ActionsTypesIncomings";

//GET CURRENT  MONTH INCOMINGS
export const getCurrentMonthIncomingsAction = createAction(
  ActionsTypesIncomings.GET_CURRENT_MONTH_INCOMINGS_ACTION,
)

export const getCurrentMonthIncomingsSuccessAction = createAction(
  ActionsTypesIncomings.GET_CURRENT_MONTH_INCOMINGS_ACTION_SUCCESS,
  props<{ monthIncomings: IncomingsMonthResponseInterface[] }>()
)

export const getCurrentMonthIncomingsFailureAction = createAction(
  ActionsTypesIncomings.GET_CURRENT_MONTH_INCOMINGS_ACTION_FAILURE
)

//GET CURRENT YEAR INCOMINGS
export const getCurrentYearIncomingsAction = createAction(
  ActionsTypesIncomings.GET_CURRENT_YEAR_INCOMINGS_ACTION,
)

export const getCurrentYearIncomingsSuccessAction = createAction(
  ActionsTypesIncomings.GET_CURRENT_YEAR_INCOMINGS_ACTION_SUCCESS,
  props<{ monthIncomings: IncomingsMonthResponseInterface[] }>()
)

export const getCurrentYearIncomingsFailureAction = createAction(
  ActionsTypesIncomings.GET_CURRENT_YEAR_INCOMINGS_ACTION_FAILURE
)
