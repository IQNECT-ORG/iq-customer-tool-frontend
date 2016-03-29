import Immutable from 'immutable';
import Constants from '../Constants';

const Actions = Constants.ActionTypes;

export default (state, action) => {
  if(state == null) {
    return new Immutable.Map({
      path: null
    });
  }

  switch(action.type) {
    case Actions.MODAL_OPEN:
      return state.merge({
        path: action.path
      });
    case Actions.MODAL_CLOSE:
      return state.merge({
        path: null
      });
  }
  return state;
};