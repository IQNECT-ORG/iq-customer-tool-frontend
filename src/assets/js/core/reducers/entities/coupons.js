import Constants from '../../Constants';
import { createReducer } from 'redux-create-reducer';
import crudReducer from 'redux-entity-crud/lib/reducer'

const Actions = Constants.ActionTypes;

let reducer = createReducer({}, {

});
reducer = crudReducer(reducer, {
  idKey: 'couponId',
  path: ['payload', 'entities', 'coupons'],
  create: 'COUPONS_CREATE_SUCCESS',
  read: 'COUPONS_FETCH_SUCCESS',
  update: 'COUPONS_UPDATE_SUCCESS',
  delete: 'COUPONS_DELETE_SUCCESS'
});

export default reducer;