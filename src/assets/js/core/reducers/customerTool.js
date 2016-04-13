import { combineReducers } from 'redux';
import routeReducer from './routeReducer';
import auth from './auth';
import alerts from './alerts';
import campaigns from 'app/campaigns/reducers';
import { reducer as ui } from 'redux-ui/transpiled';
import { reducer as form }  from 'redux-form';
import modal from 'app/modal/reducer';
import entities from './entities';
import errors from './errors';

const customerTool = combineReducers({
  auth,
  alerts,
  routing: routeReducer,
  entities,
  campaigns,
  ui,
  form,
  modal,
  errors
});

export default customerTool;