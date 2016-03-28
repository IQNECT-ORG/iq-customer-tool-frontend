import { combineReducers } from 'redux-immutable';
import routeReducer from './routeReducer';

const customerTool = combineReducers({
  test: function() {
    return {};
  },
  routing: routeReducer
});

export default customerTool;