import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, take, fork, select } from 'redux-saga/effects';
import _ from 'lodash';
import couponActions from 'app/common/actions/coupons';
import { change } from 'redux-form/lib/actions';

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
  yield takeEvery('LOAD_CAMPAIGN_COUPON_BROWSER_MODAL', load);
};

function* watchSelectCoupon() {
  yield takeEvery('CAMPAIGN_SELECT_COUPON', selectCoupon);
}


export default function* root() {
  yield fork(watchLoad);
  yield fork(watchSelectCoupon);
};