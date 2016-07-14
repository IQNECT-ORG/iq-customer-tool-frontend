import { createReducer } from 'redux-create-reducer';
import crudReducer from 'redux-entity-crud/lib/reducer'

let reducer = createReducer({}, {

});
reducer = crudReducer(reducer, {
  idKey: 'brandId',
  path: ['payload', 'entities', 'brands'],
  create: 'BRANDS_CREATE_SUCCESS',
  read: 'BRANDS_FETCH_SUCCESS',
  update: 'BRANDS_UPDATE_SUCCESS',
  delete: 'BRANDS_DELETE_SUCCESS'
});

export default reducer;