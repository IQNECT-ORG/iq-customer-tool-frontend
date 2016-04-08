import { combineReducers } from 'redux';
import routeReducer from './routeReducer';
import drawNav from './drawNav';
import auth from './auth';
import alerts from './alerts';
import campaignPrint from 'app/campaigns/print/reducers';
import { reducer as ui } from 'redux-ui/transpiled';
import { reducer as form }  from 'redux-form';
import modal from 'app/modal/reducer';
import entities from './entities';

const customerTool = combineReducers({
  auth,
  drawNav,
  alerts,
  routing: routeReducer,
  entities,
  campaignPrint,
  ui,
  form,
  modal
});

export default customerTool;