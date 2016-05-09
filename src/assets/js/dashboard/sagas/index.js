import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, take, fork, select } from 'redux-saga/effects';
import _ from 'lodash';
import { countCampaigns, countTriggers, getBrands } from 'app/core/sagas/entities';
import {
  countSearches as countSearchesApi,
  topBrands as topBrandsApi
} from 'app/core/services/api/analytics';

function* load(action) {
  // Need to get the logged in user account
  yield fork(countCampaigns, {});
  // Need to send the type and the user account
  yield fork(countTriggers, {});

  yield fork(function*() {
    const { json, reponse } = yield call(countSearchesApi);

    yield put({
      type: 'DASHBOARD_UPDATE_MATCHES_COUNT',
      payload: json.countSearches.matched
    });
  });

  yield fork(function*() {
    const { json, reponse } = yield call(topBrandsApi);

    const brandIds = _.map(json.topBrands, x => {
      return x.brand.brandId;
    });

    yield put({
      type: 'DASHBOARD_UPDATE_TOP_BRANDS',
      payload: brandIds
    });

    // Now actually get the brands
    yield fork(getBrands, {
      params: {
        brandId: brandIds
      }
    });
  });

  yield fork(function*() {
    const countAction = yield take('CAMPAIGNS_COUNT_SUCCESS');

    yield put({
      type: 'DASHBOARD_UPDATE_CAMPAIGNS_COUNT',
      payload: countAction.payload
    });
  });

  yield fork(function*() {
    const countAction = yield take('TRIGGERS_COUNT_SUCCESS');

    yield put({
      type: 'DASHBOARD_UPDATE_TRIGGERS_COUNT',
      payload: countAction.payload
    });
  });
}

//-----------------------------------------------------------
//----------------------- Watchers --------------------------
//-----------------------------------------------------------

function* watchLoad() {
  yield takeEvery('LOAD_DASHBOARD_PAGE', load);
};

export default function* root() {
  yield fork(watchLoad);
}