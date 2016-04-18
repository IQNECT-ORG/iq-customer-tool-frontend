import Constants from '../Constants';
import { createAction } from 'redux-actions';

const Actions = Constants.ActionTypes;

export const fetchTriggers = createAction(Actions.TRIGGERS_FETCH_REQUEST);
export const fetchTriggersSuccess = createAction(Actions.TRIGGERS_FETCH_SUCCESS);
export const fetchTriggersFailure = createAction(Actions.TRIGGERS_FETCH_FAILURE);

export const updateTrigger = createAction(Actions.TRIGGER_UPDATE_REQUEST);
export const updateTriggerSuccess = createAction(Actions.TRIGGER_UPDATE_SUCCESS);
export const updateTriggerFailure = createAction(Actions.TRIGGER_UPDATE_FAILURE);
