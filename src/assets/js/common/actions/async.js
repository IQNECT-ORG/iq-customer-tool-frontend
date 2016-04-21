import { createAction } from 'redux-actions';
import _ from 'lodash';

// login -> { login, loginRequest, loginSuccess, ... }
// && { LOGIN, LOGIN_REQUEST , ... }
export const generateActions = (actionNamePrefix, actionTypePrefix) => {
  const variations = ['', 'request', 'success', 'failure'];

  return _.reduce(variations, (result, variation) => {
    // Make the function name (action name)
    const fnName = actionNamePrefix + _.capitalize(variation);

    // Make the action type
    const actionType = _([actionTypePrefix, actionNamePrefix])
      .tap(array => {
        if(variation.length > 0) {
          array.push(variation);
        }
      })
      .map(_.snakeCase)
      .thru(value => _.join(value, '_'))
      .thru(_.toUpper)
      .value();


    // Make the action
    result[fnName] = createAction(actionType);

    return result;
  }, {});
};