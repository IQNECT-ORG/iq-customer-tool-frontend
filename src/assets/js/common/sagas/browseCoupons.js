import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, take, fork, select } from 'redux-saga/effects';
import _ from 'lodash';
import couponActions from 'app/common/actions/coupons';

function* load(action) {
  yield put(couponActions.fetch());
}

//-----------------------------------------------------------
//----------------------- Watchers --------------------------
//-----------------------------------------------------------

function* watchLoad() {
  yield takeEvery('LOAD_BROWSE_COUPONS_MODAL', load);
};


export default function* root() {
  yield fork(watchLoad);
};