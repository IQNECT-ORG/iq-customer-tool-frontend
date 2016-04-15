import { combineReducers } from 'redux-immutablejs';
import previews from './previews';
import brands from './brands';
import campaigns from './campaigns';

export default combineReducers({
  previews,
  brands,
  campaigns
});