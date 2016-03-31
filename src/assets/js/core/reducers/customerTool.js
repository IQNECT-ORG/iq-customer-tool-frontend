import { combineReducers } from 'redux-immutable';
import routeReducer from './routeReducer';
import drawNav from './drawNav';
import auth from './auth';
import alerts from './alerts';
import modal from './modal';
import catalogue from './catalogue';
import campaign from './campaign';

const customerTool = combineReducers({
  auth,
  drawNav,
  alerts,
  modal,
  routing: routeReducer,
  //entities
  catalogue,
  campaign
});

export default customerTool;