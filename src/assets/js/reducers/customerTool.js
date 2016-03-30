import { combineReducers } from 'redux-immutable';
import routeReducer from './routeReducer';
import drawNav from './drawNav';
import auth from './auth';
import alerts from './alerts';
import modal from './modal';
import catalogue from './catalogue';

const customerTool = combineReducers({
  auth,
  drawNav,
  alerts,
  modal,
  catalogue,
  routing: routeReducer
});

export default customerTool;