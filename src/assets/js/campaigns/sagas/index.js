import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, take, fork, select } from 'redux-saga/effects';
import brandActions from 'app/common/actions/brands';
import campaignActions from 'app/common/actions/campaigns';
import triggerActions from 'app/common/actions/triggers';
import * as routerActions from 'react-router-redux/lib/actions';
import { getTriggers, getTrainingResults } from 'app/core/sagas/entities';
import _ from 'lodash';
import Constants from 'app/common/Constants';
import imageForm from './imageForm';
import pdfForm from './pdfForm';
import browseCoupons from './browseCoupons';

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
  yield takeEvery('LOAD_CAMPAIGN_CREATE_PAGE', loadCampaignCreatePage);
};

function* watchLoadCampaignEditPage() {
  yield takeEvery('LOAD_CAMPAIGN_EDIT_PAGE', loadCampaignEditPage);
};

// Selecting
function* watchCampaignCreateBrandSelect() {
  yield takeEvery('CAMPAIGN_CREATE_BRAND_SELECT', function* (action) {
    yield put(routerActions.push(`/campaigns/create/${action.payload || ''}`));
  });
};

function* watchCampaignCreateCampaignTypeSelect() {
  yield takeEvery('CAMPAIGN_CREATE_CAMPAIGN_TYPE_SELECT', function* (action) {
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
    yield put(routerActions.push(url));
  });
};

export default function* () {
  yield fork(watchLoadCampaignCreatePage);
  yield fork(watchLoadCampaignEditPage);
  yield fork(browseCoupons);

  yield fork(imageForm);
  yield fork(pdfForm);

  yield fork(watchCampaignCreateBrandSelect);
  yield fork(watchCampaignCreateCampaignTypeSelect);
};