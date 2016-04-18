import { combineReducers } from 'redux-immutablejs';
import previews from './previews';
import brands from './brands';
import campaigns from './campaigns';
import triggers from './triggers';
import trainingResults from './trainingResults';

export default combineReducers({
  previews,
  brands,
  campaigns,
  triggers,
  trainingResults
});