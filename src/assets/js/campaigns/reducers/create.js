import { createReducer } from 'redux-create-reducer';
import recycleState from 'redux-recycle';
import {
  M_CAMPAIGN_CREATE_RESET,
  M_CAMPAIGN_CREATE_SELECT_BRAND,
  M_CAMPAIGN_CREATE_SELECT_CAMPAIGN_TYPE
} from '../messages';

export const initialState = {
  selectedBrandId: null,
  selectedCampaignTypeId: null
};

const reducer = createReducer(initialState, {
  [M_CAMPAIGN_CREATE_SELECT_BRAND]: (state, action) => {
    return _.assign({}, state, { selectedBrandId: action.payload })
  },
  [M_CAMPAIGN_CREATE_SELECT_CAMPAIGN_TYPE]: (state, action) => {
    return _.assign({}, state, { selectedCampaignTypeId: action.payload });
  }
});

export default recycleState(reducer, [
  M_CAMPAIGN_CREATE_RESET
], initialState);