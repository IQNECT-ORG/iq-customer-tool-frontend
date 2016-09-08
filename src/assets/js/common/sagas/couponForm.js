import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, take, fork, select } from 'redux-saga/effects';
// Actions
import { change } from 'redux-form/lib/actions';
// Signals
import {
  S_COUPON_CREATE_FORM_SUBMIT,
  S_COUPON_EDIT_FORM_SUBMIT
} from '../signals';
// Messages
import { modalClose } from 'app/modal/messages';
// Utils
import _ from 'lodash';
// Services
// Selectors
// Sagas
import { createCoupon, updateCoupon } from 'app/core/sagas/entities';

function* onCreateFormSubmit(action) {
  const values = action.payload.values;

  const couponTask = yield fork(createCoupon, {
    data: {
      title: values.couponName,
      subtitle: values.discountCode,
      url: values.url,
      media: values.artwork
    }
  });
  // Wait for request to finish
  const couponAction = yield take(['COUPONS_CREATE_SUCCESS', 'COUPONS_CREATE_FAILURE']);

  // Reject the form
  if(couponAction.type === 'COUPONS_CREATE_FAILURE') {
    action.payload.reject();
    return;
  }

  if(action.payload.ref) {
    let ref = action.payload.ref;
    const changeAction = change(ref.field, couponAction.payload.result);
    changeAction.form = ref.form;
    yield put(changeAction);
  }

  action.payload.resolve();
  // Need to go somewhere now...
  if(action.payload.isModal === true) {
    yield put(modalClose());
  }
};

function* onEditFormSubmit(action) {
  const values = action.payload.values;
  
  const couponTask = yield fork(updateCoupon, {
    id: action.payload.values.couponId,
    data: {
      title: values.couponName,
      subtitle: values.discountCode,
      media: values.artwork
    }
  });
  // Wait for request to finish
  const couponAction = yield take(['COUPONS_UPDATE_SUCCESS', 'COUPONS_UPDATE_FAILURE']);

  // Reject the form
  if(couponAction.type === 'COUPONS_UPDATE_FAILURE') {
    action.payload.reject();
    return;
  }

  action.payload.resolve();
  // Need to go somewhere now...
  if(action.payload.isModal === true) {
    yield put(modalClose());
  }
}

//-----------------------------------------------------------
//----------------------- Watchers --------------------------
//-----------------------------------------------------------

function* watchCreateFormSubmit() {
  yield takeEvery(S_COUPON_CREATE_FORM_SUBMIT, onCreateFormSubmit);
};

function* watchEditFormSubmit() {
  yield takeEvery(S_COUPON_EDIT_FORM_SUBMIT, onEditFormSubmit);
};


export default function* root() {
  yield fork(watchCreateFormSubmit);
  yield fork(watchEditFormSubmit);
};