import { combineReducers } from 'redux-immutable';
import routeReducer from './routeReducer';
import drawNav from './drawNav';

const customerTool = combineReducers({
  drawNav: drawNav,
  routing: routeReducer
});

export default customerTool;