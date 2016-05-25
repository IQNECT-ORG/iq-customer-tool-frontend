import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, take, fork, select } from 'redux-saga/effects';
import brandActions from 'app/common/actions/brands';
import campaignActions from 'app/common/actions/campaigns';
import triggerActions from 'app/common/actions/triggers';
import * as routerActions from 'react-router-redux/lib/actions';
import _ from 'lodash';

function* loadBrandsPage() {
  yield put(brandActions.fetch());
}

function* loadCampaignsPage() {
  yield put(campaignActions.fetch());
  const campaignAction = yield take('CAMPAIGNS_FETCH_SUCCESS');

  // Ok. Let me level with you.
  // There is no pagination on this screen, which is bad.
  // I would rather not do X requests just to get the thumbnail
  // so the easy way is to get all of the triggers via batch filtering
  // however, then the URI gets massive and it all breaks.
  // So here we are, now having to cheat by creating batches of requests.
  // Enjoy :)
  const batches = _.chunk(campaignAction.payload.result, 10);

  yield _.map(batches, function*(batch) {
    yield put(triggerActions.fetch({
      params: {
        campaignId: batch
      }
    }));
  });
}

function* loadCouponsPate() {

}

function* watchLoadBrandsPage() {
  yield takeEvery('LOAD_CATALOGUE_BRAND_PAGE', loadBrandsPage);
}

function* watchLoadCampaignsPage() {
  yield takeEvery('LOAD_CATALOGUE_CAMPAIGN_PAGE', loadCampaignsPage);
}

function* watchLoadCouponsPage() {
  yield takeEvery('LOAD_CATALOGUE_COUPON_PAGE', loadCouponsPate);
}

export default function* () {
  yield fork(watchLoadBrandsPage);
  yield fork(watchLoadCampaignsPage);
  yield fork(watchLoadCouponsPage);
}