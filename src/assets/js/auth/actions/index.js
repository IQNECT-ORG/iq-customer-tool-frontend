import Constants from '../Constants';
import { createAction } from 'redux-actions';
import { generateActions as generateAsyncActions } from 'redux-entity-crud/lib/actions/async';
import _ from 'lodash';

const Actions = Constants.ActionTypes;

const actions = {};

_.assign(
  actions,
  generateAsyncActions('login', 'auth'),
  generateAsyncActions('forgottenPassword', 'auth'),
  generateAsyncActions('resetPassword', 'auth'),
  generateAsyncActions('authenticate', 'auth')
);

export default actions;