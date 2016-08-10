import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, take, fork, select } from 'redux-saga/effects';
import brandActions from 'app/common/actions/brands';
import campaignActions from 'app/common/actions/campaigns';
import triggerActions from 'app/common/actions/triggers';
import * as campaignListSaga from 'app/common/sagas/campaignList';
import {
  S_CATALOGUE_LOAD_BRAND_PAGE,
  S_CATALOGUE_LOAD_CAMPAIGN_PAGE,
  S_CATALOGUE_LOAD_COUPON_PAGE
} from '../signals';

// Handlers

function* onLoadBrandsPage() {
  yield put(brandActions.fetch());
}

function* onLoadCampaignsPage() {
  yield call(campaignListSaga.load);
}

function* onLoadCouponsPage() {

}

// Watchers

function* watchLoadBrandsPage() {
  yield takeEvery(S_CATALOGUE_LOAD_BRAND_PAGE, onLoadBrandsPage);
}

function* watchLoadCampaignsPage() {
  yield takeEvery(S_CATALOGUE_LOAD_CAMPAIGN_PAGE, onLoadCampaignsPage);
}

function* watchLoadCouponsPage() {
  yield takeEvery(S_CATALOGUE_LOAD_COUPON_PAGE, onLoadCouponsPage);
}

export default function* () {
  yield fork(watchLoadBrandsPage);
  yield fork(watchLoadCampaignsPage);
  yield fork(watchLoadCouponsPage);
}