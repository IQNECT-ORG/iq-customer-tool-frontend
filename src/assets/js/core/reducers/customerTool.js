import { combineReducers } from 'redux-immutablejs';
import routeReducer from './routeReducer';
import drawNav from './drawNav';
import auth from './auth';
import alerts from './alerts';
import campaignPrint from 'app/campaigns/print/reducers';

const customerTool = combineReducers({
  auth,
  drawNav,
  alerts,
  routing: routeReducer,
  //entities
  campaignPrint
});

export default customerTool;