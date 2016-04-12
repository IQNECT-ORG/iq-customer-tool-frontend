import Immutable from 'immutable';
import Constants from '../../Constants';
import { combineReducers, createReducer } from 'redux-immutablejs';
import crudReducer from '../crud';

const Actions = Constants.ActionTypes;

let reducer = createReducer(new Immutable.Map({

}), {

});
reducer = crudReducer(reducer, {
  idKey: 'id',
  create: 'BRANDS_CREATE_SUCCESS',
  read: 'BRANDS_FETCH_SUCCESS',
  update: 'BRANDS_UPDATE_SUCCESS',
  delete: 'BRANDS_DELETE_SUCCESS'
});

export default reducer;