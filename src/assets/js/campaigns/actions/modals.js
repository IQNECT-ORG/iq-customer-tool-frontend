import Constants from '../Constants';
import { createAction } from 'redux-actions';
import { change } from 'redux-form/lib/actions';

const Actions = Constants.ActionTypes;

export const loadBrowseCouponsModal = createAction(Actions.LOAD_BROWSE_COUPONS_MODAL);