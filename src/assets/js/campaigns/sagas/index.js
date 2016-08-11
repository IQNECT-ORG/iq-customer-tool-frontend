import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, take, fork, select } from 'redux-saga/effects';
// Legacy Actions
import brandActions from 'app/common/actions/brands';
import campaignActions from 'app/common/actions/campaigns';
import triggerActions from 'app/common/actions/triggers';
import * as routerActions from 'react-router-redux/lib/actions';
// Signals
import {
  S_CAMPAIGN_LOAD_CREATE_PAGE,
  S_CAMPAIGN_SELECT_BRAND,
  S_CAMPAIGN_SELECT_CAMPAIGN_TYPE
} from '../signals';
// Messages
import {
  campaignCreateSelectBrand,
  campaignCreateSelectCampaignType
} from '../messages';
// Sagas
import { getTriggers, getTrainingResults } from 'app/core/sagas/entities';
import imageForm from './imageForm';
import pdfForm from './pdfForm';
import videoForm from './videoForm';
import pdfSummaryForm from './pdfSummaryForm';
import browseCoupons from './browseCoupons';
// Services
// Utils
import _ from 'lodash';
import Constants from 'app/common/Constants';

function* loadCampaignCreatePage(action) {
  yield put(brandActions.fetch());
}

function* loadCampaignEditPage(action) {
  yield put(campaignActions.fetch({
    id: action.payload.campaignId
  }));
  yield put(brandActions.fetch());
  yield put(triggerActions.fetch({
    params: {
      campaignId: action.payload.campaignId
    }
  }));

  const campaignAction = yield take('CAMPAIGNS_FETCH_SUCCESS');
  const triggerAction = yield take('TRIGGERS_FETCH_SUCCESS');

  const campaign = campaignAction.payload.entities.campaigns[action.payload.campaignId];

  switch(campaign.type >> 0) {
    case Constants.CampaignTypes.IMAGE:

      break;
    case Constants.CampaignTypes.PDF:
      const trigger = triggerAction.payload.entities.triggers[triggerAction.payload.result[0]];
      const trainingResultTask = yield fork(getTrainingResults, {
        url: trigger.trainingResult,
        parserOptions: {
          triggerId: trigger.triggerId
        }
      });
      break;
  }
}


//-----------------------------------------------------------
//----------------------- Watchers --------------------------
//-----------------------------------------------------------

function* watchLoadCampaignCreatePage() {
  yield takeEvery(S_CAMPAIGN_LOAD_CREATE_PAGE, loadCampaignCreatePage);
};

function* watchLoadCampaignEditPage() {
  yield takeEvery('LOAD_CAMPAIGN_EDIT_PAGE', loadCampaignEditPage);
};

// Selecting
function* watchCampaignCreateBrandSelect() {
  yield takeEvery(S_CAMPAIGN_SELECT_BRAND, function* (action) {
    yield put(campaignCreateSelectBrand(action.payload));
    yield put(routerActions.push(`/campaigns/create/${action.payload || ''}`));
  });
};

function* watchCampaignCreateCampaignTypeSelect() {
  yield takeEvery(S_CAMPAIGN_SELECT_CAMPAIGN_TYPE, function* (action) {
    const selectedBrandId = yield select((state) => {
      return state.campaigns.create.selectedBrandId;
    });

    let url;
    if(selectedBrandId == null) {
      url = '/campaigns/create';
    } else if(action.payload == null) {
      url = `/campaigns/create/${selectedBrandId}`;
    } else {
      url = `/campaigns/create/${selectedBrandId}/${action.payload}`;
    }
    yield put(campaignCreateSelectCampaignType(action.payload));
    yield put(routerActions.push(url));
  });
};

export default function* () {
  yield [
    watchLoadCampaignCreatePage(),
    watchLoadCampaignEditPage(),
    browseCoupons(),
    imageForm(),
    pdfForm(),
    videoForm(),
    pdfSummaryForm(),
    watchCampaignCreateBrandSelect(),
    watchCampaignCreateCampaignTypeSelect()
  ];
};