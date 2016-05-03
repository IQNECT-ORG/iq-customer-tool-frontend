import Constants from '../Constants';
import { createAction } from 'redux-actions';
import { generateActions as generateAsyncActions } from 'redux-entity-crud/lib/actions/async';
import _ from 'lodash';

const Actions = Constants.ActionTypes;

const actions = {};

_.assign(actions, generateAsyncActions('login', 'auth'));
_.assign(actions, generateAsyncActions('forgottenPassword', 'auth'));
_.assign(actions, generateAsyncActions('resetPassword', 'auth'));

export default actions;