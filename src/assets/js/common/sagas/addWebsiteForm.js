import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, take, fork, select } from 'redux-saga/effects';
// Signals
import {
  S_ADD_WEBSITE_FORM_SUBMIT
} from '../signals';
// Messages
import { modalClose } from 'app/modal/messages';
// Actions
import { changeForm } from '../actions';
// Utils
// Services
// Selectors
// Sagas

function* onSubmit(action) {
  // @TODO: Validation goes here
  
  yield put(changeForm(
    action.payload.referenceForm,
    action.payload.referenceField,
    action.payload.values.website
  ));

  if(action.payload.isModal === true) {
    yield put(modalClose());
  }
};

//-----------------------------------------------------------
//----------------------- Watchers --------------------------
//-----------------------------------------------------------

function* watchSubmit() {
  yield takeEvery(S_ADD_WEBSITE_FORM_SUBMIT, onSubmit);
};


export default function* addWebsiteForm() {
  yield [
    watchSubmit()
  ];
};