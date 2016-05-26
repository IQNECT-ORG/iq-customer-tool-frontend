import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, take, fork, select } from 'redux-saga/effects';
import brandActions from 'app/common/actions/brands';
import campaignActions from 'app/common/actions/campaigns';
import triggerActions from 'app/common/actions/triggers';
import * as routerActions from 'react-router-redux/lib/actions';
import _ from 'lodash';
import * as campaignListSaga from 'app/common/sagas/campaignList';

function* loadBrandsPage() {
  yield put(brandActions.fetch());
}

function* loadCampaignsPage() {
  yield call(campaignListSaga.load);
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