import Immutable from 'immutable';
import Constants from '../Constants';
import ui from './ui';
import { combineReducers } from 'redux-immutablejs';

const Actions = Constants.ActionTypes;

const create = combineReducers({
  data: (state, action) => {
    if(state == null) {
      return new Immutable.Map({
        campaignTitle: null,
        magazineLanguage: null,
        campaignPeriodFrom: null,
        campaignPeriodTo: null,
        defaultTarget: null,
      });
    }

    return state;
  }
});

export default combineReducers({
  ui,
  create
});