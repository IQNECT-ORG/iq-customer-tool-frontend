import Immutable from 'immutable';
import Constants from '../Constants';

const Actions = Constants.ActionTypes;

export default (state, action) => {
  if(state == null) {
    return new Immutable.Map({
      isAuthenticating: false,
      token: null
    });
  }

  switch(action.type) {
    case Actions.AUTH_LOGIN:
      return state.merge({
        isAuthenticating: true
      });
    case Actions.AUTH_LOGIN_SUCCESS:
      return state.merge({
        isAuthenticating: false,
        token: action.token
      });
  }
  return state;
};