import Immutable from 'immutable';
import Constants from '../Constants';

const Actions = Constants.ActionTypes;

export default (state, action) => {
  if(state == null) {
    return new Immutable.List();
  }

  if(action.error) {
    return state.push(new Immutable.Map({
      level: 'danger',
      message: action.error
    }));
  }

  return state;
};