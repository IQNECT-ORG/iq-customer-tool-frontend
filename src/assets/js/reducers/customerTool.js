import { combineReducers } from 'redux-immutable';
import routeReducer from './routeReducer';
import drawNav from './drawNav';
import auth from './auth';
import alerts from './alerts';
import modal from './modal';

const customerTool = combineReducers({
  auth,
  drawNav,
  alerts,
  modal,
  routing: routeReducer
});

export default customerTool;