import Immutable from 'immutable';
import Constants from '../../Constants';
import { combineReducers, createReducer } from 'redux-immutablejs';
import crudReducer from '../crud';

const Actions = Constants.ActionTypes;

let reducer = createReducer(new Immutable.Map({

}), {

});
reducer = crudReducer(reducer, {
  idKey: 'payloadId',
  path: ['payload', 'entities', 'triggerPayloads'],
  create: 'TRIGGER_PAYLOADS_CREATE_SUCCESS',
  read: ['TRIGGER_PAYLOADS_FETCH_SUCCESS', 'TRIGGERS_FETCH_SUCCESS'],
  update: 'TRIGGER_PAYLOADS_UPDATE_SUCCESS',
  delete: 'TRIGGER_PAYLOADS_DELETE_SUCCESS'
});

export default reducer;