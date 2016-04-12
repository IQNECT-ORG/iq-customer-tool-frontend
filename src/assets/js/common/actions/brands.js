import Constants from '../Constants';
import { createAction } from 'redux-actions';

const Actions = Constants.ActionTypes;

export const brandsFetchRequest = createAction(Actions.BRANDS_FETCH_REQUEST);
export const brandsFetchSuccess = createAction(Actions.BRANDS_FETCH_SUCCESS);
export const brandsFetchFailure = createAction(Actions.BRANDS_FETCH_FAILURE);