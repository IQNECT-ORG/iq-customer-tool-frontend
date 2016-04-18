import Immutable from 'immutable';
import Constants from '../../Constants';
import { combineReducers, createReducer } from 'redux-immutablejs';
import crudReducer from '../crud';

const Actions = Constants.ActionTypes;

let reducer = createReducer(new Immutable.Map({

}), {

});
reducer = crudReducer(reducer, {
  idKey: 'triggerId',
  path: ['payload', 'entities', 'triggers'],
  create: 'TRIGGERS_CREATE_SUCCESS',
  read: 'TRIGGERS_FETCH_SUCCESS',
  update: 'TRIGGERS_UPDATE_SUCCESS',
  delete: 'TRIGGERS_DELETE_SUCCESS'
});

export default reducer;