import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, take, fork, select } from 'redux-saga/effects';
// Signals
import {
  S_BRAND_ADD_FORM_SUBMIT,
  S_BRAND_EDIT_FORM_SUBMIT
} from '../signals';
// Messages
import { modalClose } from 'app/modal/messages';
// Utils
import _ from 'lodash';
// Services
// Selectors
// Sagas
import { createBrand, updateBrand } from 'app/core/sagas/entities';

function* onAddFormSubmit(action) {
  const brandTask = yield fork(createBrand, {
    data: action.payload.values
  });
  // Wait for request to finish
  const brandAction = yield take(['BRANDS_CREATE_SUCCESS', 'BRANDS_CREATE_FAILURE']);

  // Reject the form
  if(brandAction.type === 'BRANDS_CREATE_FAILURE') {
    action.payload.reject();
    return;
  }

  action.payload.resolve();
  // Need to go somewhere now...
  if(action.payload.isModal === true) {
    yield put(modalClose());
  }
};

function* onEditFormSubmit(action) {
  const brandTask = yield fork(updateBrand, {
    id: action.payload.values.brandId,
    data: action.payload.values
  });
  // Wait for request to finish
  const brandAction = yield take(['BRANDS_UPDATE_SUCCESS', 'BRANDS_UPDATE_FAILURE']);

  // Reject the form
  if(brandAction.type === 'BRANDS_UPDATE_FAILURE') {
    action.payload.reject();
    return;
  }

  action.payload.resolve();
  // Need to go somewhere now...
  if(action.payload.isModal === true) {
    yield put(modalClose());
  }
};


//-----------------------------------------------------------
//----------------------- Watchers --------------------------
//-----------------------------------------------------------

function* watchAddFormSubmit() {
  yield takeEvery(S_BRAND_ADD_FORM_SUBMIT, onAddFormSubmit);
};

function* watchEditFormSubmit() {
  yield takeEvery(S_BRAND_EDIT_FORM_SUBMIT, onEditFormSubmit);
};

export default function* root() {
  yield fork(watchAddFormSubmit);
  yield fork(watchEditFormSubmit);
};