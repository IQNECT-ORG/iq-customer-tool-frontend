import { change } from 'redux-form/lib/actions';

export const changeForm = (form, ...args) => {
  const action = change(...args);
  action.form = form;

  return action;
};