import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import auth from 'app/auth/reducers';
import alerts from './alerts';
import campaigns from 'app/campaigns/reducers';
import { reducer as ui } from 'redux-ui/transpiled';
import { reducer as form }  from 'redux-form';
import modal from 'app/modal/reducer';
import entities from './entities';
import errors from './errors';
import catalogue from './catalogue';
import dashboard from 'app/dashboard/reducers';

const customerTool = combineReducers({
  auth,
  alerts,
  routing,
  entities,
  campaigns,
  ui,
  form,
  modal,
  errors,
  catalogue,
  dashboard
});

export default customerTool;