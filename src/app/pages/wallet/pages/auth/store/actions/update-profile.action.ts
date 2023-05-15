import {createAction, props} from "@ngrx/store";
import {ActionTypes} from "../actionTypes";
import {RegisterRequestInterface} from "../../types/registerRequest.interface";
import {CurrentUserInterface} from "../../../../../../shared/types/currentUser.interface";

export const updateProfileAction = createAction(
  ActionTypes.UPDATE_PROFILE,
  props<{ request: RegisterRequestInterface }>(),
)

export const updateProfileSuccessAction = createAction(
  ActionTypes.UPDATE_PROFILE_SUCCESS,
  props<{ currentUser: CurrentUserInterface }>(),
)
