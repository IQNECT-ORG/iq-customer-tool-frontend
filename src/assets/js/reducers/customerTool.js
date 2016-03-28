import { combineReducers } from 'redux-immutable';
import routeReducer from './routeReducer';
import drawNav from './drawNav';
import auth from './auth';
import alerts from './alerts';

const customerTool = combineReducers({
  auth,
  drawNav,
  alerts,
  routing: routeReducer
});

export default customerTool;