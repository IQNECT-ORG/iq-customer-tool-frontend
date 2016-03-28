import Constants from '../Constants';

const Actions = Constants.ActionTypes;

export function login(username, password) {
  return function(dispatch) {
    dispatch({
      type: Actions.AUTH_LOGIN
    });

    dispatch({
      type: Actions.AUTH_LOGIN_SUCCESS,
      token: 123
    });
  };
};