import { change, removeArrayValue } from 'redux-form/lib/actions';

export const changeForm = (form, ...args) => {
  const action = change(...args);
  action.form = form;

  return action;
};

export const removeArrayValueForm = (form, ...args) => {
  const action = removeArrayValue(...args);
  action.form = form;

  return action;
};