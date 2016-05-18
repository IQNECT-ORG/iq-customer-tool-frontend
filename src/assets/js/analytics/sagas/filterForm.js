import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, take, fork, select } from 'redux-saga/effects';
import { filtersUpdate } from '../actions';

function* submit(action) {
  yield put(filtersUpdate(action.payload.values));
  action.payload.resolve();
}

function* watchSubmit() {
  yield takeEvery('ANALYTICS_FILTER_FORM_SUBMIT', submit);
}

export default function* () {
  yield fork(watchSubmit);
};