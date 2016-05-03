import Constants from '../Constants';
import { createAction } from 'redux-actions';
import { generateActions } from 'redux-entity-crud/lib/actions/crud';

const Actions = Constants.ActionTypes;
export default generateActions('trainingResults');
