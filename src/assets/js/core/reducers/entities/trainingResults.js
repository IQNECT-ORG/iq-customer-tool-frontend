import Constants from '../../Constants';
import { createReducer } from 'redux-create-reducer';
import crudReducer from 'redux-entity-crud/lib/reducer'

const Actions = Constants.ActionTypes;

let reducer = createReducer({}, {

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