import Immutable from 'immutable';
import Constants from '../../Constants';
import { combineReducers, createReducer } from 'redux-immutablejs';

const Actions = Constants.ActionTypes;

export default combineReducers({
  jobs: createReducer(new Immutable.Map({
    // Initial
  }), {
    [Actions.PREVIEW_JOB_REQUEST_SUCCESS]: (state, action) => {
      return state.merge(Immutable.fromJS(action.payload.entities.jobs));
    },
    [Actions.PREVIEW_JOB_STATUS_SUCCESS]: (state, action) => {
      return state.merge(Immutable.fromJS(action.payload.entities.jobs));
    }
  }),

  screenshots: createReducer(new Immutable.Map({
    // Initial
  }), {
    [Actions.PREVIEW_JOB_REQUEST_SUCCESS]: (state, action) => {
      return state.merge(Immutable.fromJS(action.payload.entities.screenshots));
    },
    [Actions.PREVIEW_JOB_STATUS_SUCCESS]: (state, action) => {
      return state.merge(Immutable.fromJS(action.payload.entities.screenshots));
    }
  })
});