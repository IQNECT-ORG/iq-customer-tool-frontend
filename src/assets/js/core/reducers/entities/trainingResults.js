import Immutable from 'immutable';
import Constants from '../../Constants';
import { combineReducers, createReducer } from 'redux-immutablejs';
import crudReducer from '../crud';

const Actions = Constants.ActionTypes;

let reducer = createReducer(new Immutable.Map({

}), {

});
reducer = crudReducer(reducer, {
  idKey: 'trainingResultId',
  path: ['payload', 'entities', 'trainingResults'],
  create: 'TRAINING_RESULTS_CREATE_SUCCESS',
  read: 'TRAINING_RESULTS_FETCH_SUCCESS',
  update: 'TRAINING_RESULTS_UPDATE_SUCCESS',
  delete: 'TRAINING_RESULTS_DELETE_SUCCESS'
});

export default reducer;