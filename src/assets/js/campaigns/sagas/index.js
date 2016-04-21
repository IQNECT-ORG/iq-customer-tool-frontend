import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, take, fork, select } from 'redux-saga/effects';
import brandActions from 'app/common/actions/brands';
import * as routerActions from 'react-router-redux/lib/actions';

function* watchLoadCampaignCreatePage() {
  yield takeEvery('LOAD_CAMPAIGN_CREATE_PAGE', function* () {
    yield put(brandActions.fetch());
  });
};

// Selecting
function* watchCampaignCreateBrandSelect() {
  yield takeEvery('CAMPAIGN_CREATE_BRAND_SELECT', function* (action) {
    yield put(routerActions.push(`/campaign/create/${action.payload || ''}`));
  });
};

function* watchCampaignCreateCampaignTypeSelect() {
  yield takeEvery('CAMPAIGN_CREATE_CAMPAIGN_TYPE_SELECT', function* (action) {
    const selectedBrandId = yield select((state) => {
      return state.campaigns.getIn(['create', 'selectedBrandId']);
    });

    let url;
    if(selectedBrandId == null) {
      url = '/campaign/create';
    } else if(action.payload == null) {
      url = `/campaign/create/${selectedBrandId}`;
    } else {
      url = `/campaign/create/${selectedBrandId}/${action.payload}`;
    }
    yield put(routerActions.push(url));
  });
};

export default function* () {
  yield fork(watchLoadCampaignCreatePage);
  // Selecting
  yield fork(watchCampaignCreateBrandSelect);
  yield fork(watchCampaignCreateCampaignTypeSelect);
};