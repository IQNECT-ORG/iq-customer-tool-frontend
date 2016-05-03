import Constants from '../Constants';
import { createAction } from 'redux-actions';
import { generateActions } from 'redux-entity-crud/lib/actions/crud';

const Actions = Constants.ActionTypes;
export default generateActions('brands');

export const brandAddFormSubmit = createAction(Actions.BRAND_ADD_FORM_SUBMIT);
export const brandEditFormSubmit = createAction(Actions.BRAND_EDIT_FORM_SUBMIT);
