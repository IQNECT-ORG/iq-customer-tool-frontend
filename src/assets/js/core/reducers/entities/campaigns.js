import Immutable from 'immutable';
import Constants from '../../Constants';
import { createReducer } from 'redux-create-reducer';
import crudReducer from 'redux-entity-crud/lib/reducer'

const Actions = Constants.ActionTypes;

let reducer = createReducer({}, {

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