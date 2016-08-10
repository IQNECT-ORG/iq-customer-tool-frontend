import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, take, fork, select } from 'redux-saga/effects';
// Utils
import _ from 'lodash';
// Signals
import {
  S_DASHBOARD_LOAD_INDEX_PAGE
} from '../signals';
// Messages
import {
  dashboardUpdateMatchesCount,
  dashboardUpdateTopBrands,
  dashboardUpdateCampaignsCount,
  dashboardUpdateTriggersCount
} from '../messages';
// Sagas
import { countCampaigns, countTriggers, getBrands } from 'app/core/sagas/entities';
// Services
import {
  countSearches as countSearchesApi,
  topBrands as topBrandsApi
} from 'app/core/services/api/analytics';

// Handlers
function* onLoad(action) {
  // Need to get the logged in user account
  yield fork(countCampaigns, {});
  // Need to send the type and the user account
  yield fork(countTriggers, {});

  yield fork(function*() {
    const { json, reponse } = yield call(countSearchesApi);

    yield put(dashboardUpdateMatchesCount(json.countSearches.matched));
  });

  yield fork(function*() {
    const { json, reponse } = yield call(topBrandsApi);

    const brandIds = _.map(json.topBrands, x => {
      return x.brand;
    });

    yield put(dashboardUpdateTopBrands(brandIds));

    // Now actually get the brands
    yield fork(getBrands, {
      params: {
        brandId: brandIds
      }
    });
  });

  yield fork(function*() {
    const countAction = yield take('CAMPAIGNS_COUNT_SUCCESS');

    yield put(dashboardUpdateCampaignsCount(countAction.payload));
  });

  yield fork(function*() {
    const countAction = yield take('TRIGGERS_COUNT_SUCCESS');

    yield put(dashboardUpdateTriggersCount(countAction.payload));
  });
}

//-----------------------------------------------------------
//----------------------- Watchers --------------------------
//-----------------------------------------------------------

function* watchLoad() {
  yield takeEvery(S_DASHBOARD_LOAD_INDEX_PAGE, onLoad);
};

export default function* root() {
  yield [
    watchLoad()
  ];
}