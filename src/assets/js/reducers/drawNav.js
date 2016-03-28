import Immutable from 'immutable';
import Constants from '../Constants';

const Actions = Constants.ActionTypes;

export default (state, action) => {
  if(state == null) {
    return new Immutable.Map({
      isOpen: true
    });
  }

  switch(action.type) {
    case Actions.DRAW_NAV_TOGGLE_MENU:
      return state.set('isOpen', !state.get('isOpen'));
  }
  return state;
};