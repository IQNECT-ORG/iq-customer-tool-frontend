import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, take, fork, select } from 'redux-saga/effects';
// Signals
import {
  S_ANALYTICS_FILTER_FORM_SUBMIT
} from '../signals';
// Messages
import {
  analyticsUpdateFilers
} from '../messages';

function* onSubmit(action) {
  yield put(analyticsUpdateFilers(action.payload.values));
  action.payload.resolve();
}

function* watchSubmit() {
  yield takeEvery(S_ANALYTICS_FILTER_FORM_SUBMIT, onSubmit);
}

export default function* () {
  yield fork(watchSubmit);
};