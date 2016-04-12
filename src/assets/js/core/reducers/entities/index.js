import { combineReducers } from 'redux-immutablejs';
import previews from './previews';
import brands from './brands';

export default combineReducers({
  previews,
  brands
});