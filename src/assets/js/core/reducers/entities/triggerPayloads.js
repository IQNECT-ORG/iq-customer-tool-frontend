import Constants from '../../Constants';
import { createReducer } from 'redux-create-reducer';
import crudReducer from 'redux-entity-crud/lib/reducer';

const Actions = Constants.ActionTypes;

let reducer = createReducer({}, {

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