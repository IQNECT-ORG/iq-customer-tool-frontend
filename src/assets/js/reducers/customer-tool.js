import { combineReducers } from 'redux-immutable';
import routeReducer from './routeReducer';
import _ from 'lodash';

const customerTool = combineReducers({
  test: function() {
    return {};
  },
  routing: routeReducer
})

export default customerTool;