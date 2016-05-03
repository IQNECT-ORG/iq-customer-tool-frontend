import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, take, fork, select } from 'redux-saga/effects';
import _ from 'lodash';
import { createBrand, updateBrand } from 'app/core/sagas/entities';
import { closeModal } from 'app/modal/actions';

function* brandAddFormSubmit(action) {
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
    yield put(closeModal());
  }
};

function* brandEditFormSubmit(action) {
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
    yield put(closeModal());
  }
};


//-----------------------------------------------------------
//----------------------- Watchers --------------------------
//-----------------------------------------------------------

function* watchBrandAddFormSubmit() {
  yield takeEvery('BRAND_ADD_FORM_SUBMIT', brandAddFormSubmit);
};

function* watchBrandEditFormSubmit() {
  yield takeEvery('BRAND_EDIT_FORM_SUBMIT', brandEditFormSubmit);
};

export default function* root() {
  yield fork(watchBrandAddFormSubmit);
  yield fork(watchBrandEditFormSubmit);
};