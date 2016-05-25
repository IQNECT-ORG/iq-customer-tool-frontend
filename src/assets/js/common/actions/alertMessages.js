import Constants from '../Constants';
import { createAction } from 'redux-actions';

const Actions = Constants.ActionTypes;

export const readAlertMessage = createAction(Actions.ALERT_MESSAGE_READ);
