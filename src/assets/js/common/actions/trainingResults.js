import Constants from '../Constants';
import { createAction } from 'redux-actions';

const Actions = Constants.ActionTypes;

export const fetchTrainingResults = createAction(Actions.TRAINING_RESULTS_FETCH_REQUEST);
export const fetchTrainingResultsSuccess = createAction(Actions.TRAINING_RESULTS_FETCH_SUCCESS);
export const fetchTrainingResultsFailure = createAction(Actions.TRAINING_RESULTS_FETCH_FAILURE);
