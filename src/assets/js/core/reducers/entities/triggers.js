import Immutable from 'immutable';
import Constants from '../../Constants';
import { createReducer } from 'redux-create-reducer';
import crudReducer from 'redux-entity-crud/lib/reducer';

const Actions = Constants.ActionTypes;

let reducer = createReducer({}, {

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