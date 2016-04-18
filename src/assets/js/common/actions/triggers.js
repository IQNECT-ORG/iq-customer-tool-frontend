import Constants from '../Constants';
import { createAction } from 'redux-actions';

const Actions = Constants.ActionTypes;

export const fetchTriggers = createAction(Actions.TRIGGERS_FETCH_REQUEST);
export const fetchTriggersSuccess = createAction(Actions.TRIGGERS_FETCH_SUCCESS);
export const fetchTriggersFailure = createAction(Actions.TRIGGERS_FETCH_FAILURE);
