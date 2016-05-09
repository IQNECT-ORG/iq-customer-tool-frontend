import { combineReducers } from 'redux';
import previews from './previews';
import brands from './brands';
import campaigns from './campaigns';
import triggers from './triggers';
import trainingResults from './trainingResults';
import triggerPayloads from './triggerPayloads';
import coupons from './coupons';
import users from './users';

export default combineReducers({
  previews,
  brands,
  campaigns,
  triggers,
  trainingResults,
  triggerPayloads,
  coupons,
  users
});