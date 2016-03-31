import Immutable from 'immutable';
import Constants from '../Constants';

const Actions = Constants.ActionTypes;

export default (state, action) => {
  if(state == null) {
    return new Immutable.Map({
    });
  }

  switch(action.type) {
  }
  return state;
};