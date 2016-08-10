import { createReducer } from 'redux-create-reducer';
import crudReducer, { read } from 'redux-entity-crud/lib/reducer';
import {
  M_AUTH_LOGIN_SUCCESS,
  M_AUTH_AUTHENTICATED
} from 'app/auth/messages';

let reducer = createReducer({}, {
  M_AUTH_LOGIN_SUCCESS: (state, action) => {
    return read(state, action, ['payload', 'entities', 'users'], 'userId');
  },
  M_AUTH_AUTHENTICATED: (state, action) => {
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