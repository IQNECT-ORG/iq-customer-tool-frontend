import { createReducer } from 'redux-create-reducer';
import crudReducer from 'redux-entity-crud/lib/reducer';

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