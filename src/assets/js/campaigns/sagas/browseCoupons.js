import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, take, fork, select } from 'redux-saga/effects';
import _ from 'lodash';
import couponActions from 'app/common/actions/coupons';
import { change } from 'redux-form/lib/actions';
import {
  S_CAMPAIGN_LOAD_COUPON_BROWSER_MODAL,
  S_CAMPAIGN_SELECT_COUPON
} from '../signals';

function* load(action) {
  yield put(couponActions.fetch());
}

function* selectCoupon(action) {
  const changeAction = change(action.payload.field, action.payload.couponId);
  changeAction.form = action.payload.form;

  yield put(changeAction);
  //yield put(closeModal());
}

//-----------------------------------------------------------
//----------------------- Watchers --------------------------
//-----------------------------------------------------------

function* watchLoad() {
  yield takeEvery(S_CAMPAIGN_LOAD_COUPON_BROWSER_MODAL, load);
};

function* watchSelectCoupon() {
  yield takeEvery(S_CAMPAIGN_SELECT_COUPON, selectCoupon);
}


export default function* root() {
  yield fork(watchLoad);
  yield fork(watchSelectCoupon);
};