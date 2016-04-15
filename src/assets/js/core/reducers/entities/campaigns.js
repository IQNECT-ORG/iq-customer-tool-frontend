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
  create: 'CAMPAIGN_CREATE_REQUEST',
  read: 'CAMPAIGN_FETCH_SUCCESS',
  update: 'CAMPAIGN_UPDATE_SUCCESS',
  delete: 'CAMPAIGN_DELETE_SUCCESS'
});

export default reducer;