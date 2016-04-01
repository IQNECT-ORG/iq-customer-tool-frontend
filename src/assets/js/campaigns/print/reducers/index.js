import Immutable from 'immutable';
import Constants from '../Constants';
import ui from './ui';
import { combineReducers, createReducer } from 'redux-immutablejs';

const Actions = Constants.ActionTypes;

const create = combineReducers({
  ui: createReducer(new Immutable.Map({
    step: 1
  }), {
    [Actions.CAMPAIGN_PRINT_NEXT_STEP]: state => state.set('step', state.get('step') + 1),
    [Actions.CAMPAIGN_PRINT_PREV_STEP]: state => state.set('step', state.get('step') - 1)
  }),
  data: createReducer(new Immutable.Map({
    campaignTitle: null,
    magazineLanguage: null,
    campaignPeriodFrom: null,
    campaignPeriodTo: null,
    defaultTarget: null,
  }), {

  })
});

export default combineReducers({
  ui,
  create
});