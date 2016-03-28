import { combineReducers } from 'redux-immutable';
import routeReducer from './routeReducer';
import drawNav from './drawNav';
import auth from './auth';

const customerTool = combineReducers({
  auth,
  drawNav,
  routing: routeReducer
});

export default customerTool;