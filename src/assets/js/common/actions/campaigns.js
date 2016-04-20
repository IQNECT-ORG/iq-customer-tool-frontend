import Constants from '../Constants';
import { createAction } from 'redux-actions';
import { generateActions } from './crud';

const Actions = Constants.ActionTypes;
export default generateActions('campaigns');
