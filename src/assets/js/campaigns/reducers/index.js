import { combineReducers } from 'redux';
import create from './create';
import edit from './edit';

export default combineReducers({
  create,
  edit
});