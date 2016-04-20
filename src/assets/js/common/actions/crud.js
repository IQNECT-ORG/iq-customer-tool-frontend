import { createAction } from 'redux-actions';
import _ from 'lodash';

export const generateActions = (name) => {
  const crud = ['create', 'fetch', 'update', 'delete'];
  const variations = ['', 'request', 'success', 'failure'];

  const actions = {};

  _.each(crud, (operation) => {
    _.each(variations, (variation) => {
      const fnName = operation + _.capitalize(variation);
      let actionType = [name, operation];
      if(variation.length > 0) {
        actionType.push(variation);
      }
      actionType = _.toUpper(actionType.join('_'));
      actions[fnName] = createAction(actionType);
    });
  });

  return actions;
};