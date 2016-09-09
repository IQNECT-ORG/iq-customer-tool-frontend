import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, take, fork, select } from 'redux-saga/effects';
// Signals
import {
  S_ANALYTICS_FILTER_FORM_SUBMIT
} from '../signals';
// Messages
import {
  analyticsUpdateFilters
} from '../messages';
// Sagas
import * as sagas from './sagas';

function* onSubmit(action) {
  yield put(analyticsUpdateFilters(action.payload.values));
  action.payload.resolve();
  yield call(sagas.updateData, action.payload.values);
}

function* watchSubmit() {
  yield takeEvery(S_ANALYTICS_FILTER_FORM_SUBMIT, onSubmit);
}

export default function* () {
  yield fork(watchSubmit);
};