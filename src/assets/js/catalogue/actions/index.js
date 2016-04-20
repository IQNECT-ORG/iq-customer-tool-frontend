import Constants from '../Constants';
import { createAction } from 'redux-actions';
import { change } from 'redux-form/lib/actions';

const Actions = Constants.ActionTypes;

export const loadBrandCatalogue = createAction(Actions.LOAD_CATALOGUE_BRAND_PAGE);
