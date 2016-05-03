import Constants from '../../Constants';
import { createReducer } from 'redux-create-reducer';
import { combineReducers } from 'redux';
import _ from 'lodash';

const Actions = Constants.ActionTypes;

export default combineReducers({
  jobs: createReducer({}, {
    [Actions.PREVIEW_JOB_REQUEST_SUCCESS]: (state, action) => {
      return _.assign({}, action.payload.entities.jobs);
    },
    [Actions.PREVIEW_JOB_STATUS_SUCCESS]: (state, action) => {
      return _.assign({}, action.payload.entities.jobs);
    }
  }),

  screenshots: createReducer({}, {
    [Actions.PREVIEW_JOB_REQUEST_SUCCESS]: (state, action) => {
      return _.assign({}, action.payload.entities.screenshots);
    },
    [Actions.PREVIEW_JOB_STATUS_SUCCESS]: (state, action) => {
      return _.assign({}, action.payload.entities.screenshots);
    }
  })
});