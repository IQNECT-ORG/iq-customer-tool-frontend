import Immutable from 'immutable';
import Constants from '../../Constants';
import { combineReducers, createReducer } from 'redux-immutablejs';
import crudReducer from '../crud';

const Actions = Constants.ActionTypes;

let reducer = createReducer(new Immutable.Map({

}), {

});
reducer = crudReducer(reducer, {
  idKey: 'campaignId',
  path: ['payload', 'entities', 'campaigns'],
  create: 'CAMPAIGNS_CREATE_SUCCESS',
  read: 'CAMPAIGNS_FETCH_SUCCESS',
  update: 'CAMPAIGNS_UPDATE_SUCCESS',
  delete: 'CAMPAIGNS_DELETE_SUCCESS'
});

export default reducer;