import { createReducer } from 'redux-create-reducer';
import crudReducer, { read } from 'redux-entity-crud/lib/reducer';

let reducer = createReducer({}, {
  'AUTH_LOGIN_SUCCESS': (state, action) => {
    return read(state, action, ['payload', 'entities', 'users'], 'userId');
  },
  'AUTH_AUTHENTICATE_SUCCESS': (state, action) => {
    return read(state, action, ['payload', 'entities', 'users'], 'userId');
  }
});
reducer = crudReducer(reducer, {
  idKey: 'userId',
  path: ['payload', 'entities', 'users'],
  create: 'USERS_CREATE_SUCCESS',
  read: 'USERS_FETCH_SUCCESS',
  update: 'USERS_UPDATE_SUCCESS',
  delete: 'USERS_DELETE_SUCCESS'
});

export default reducer;