import { createReducer } from 'redux-create-reducer';
import { combineReducers } from 'redux';
import _ from 'lodash';

export default combineReducers({
  __: createReducer({}, {})
  // jobs: createReducer({}, {
  //   [Actions.PREVIEW_JOB_REQUEST_SUCCESS]: (state, action) => {
  //     return _.assign({}, action.payload.entities.jobs);
  //   },
  //   [Actions.PREVIEW_JOB_STATUS_SUCCESS]: (state, action) => {
  //     return _.assign({}, action.payload.entities.jobs);
  //   }
  // }),

  // screenshots: createReducer({}, {
  //   [Actions.PREVIEW_JOB_REQUEST_SUCCESS]: (state, action) => {
  //     return _.assign({}, action.payload.entities.screenshots);
  //   },
  //   [Actions.PREVIEW_JOB_STATUS_SUCCESS]: (state, action) => {
  //     return _.assign({}, action.payload.entities.screenshots);
  //   }
  // })
});