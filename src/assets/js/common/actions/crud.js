import { createAction } from 'redux-actions';
import _ from 'lodash';
import { generateActions as generateAsyncActions } from './async';

export const generateActions = (name) => {
  const operations = ['create', 'fetch', 'update', 'delete'];

  return _.reduce(operations, (result, operation) => {
    return _.assign({}, result, generateAsyncActions(operation, name));
  }, {});
};