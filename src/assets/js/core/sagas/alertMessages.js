import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, take, fork, select } from 'redux-saga/effects';
// Signals
import {
  S_ALERT_MESSAGE_READ
} from 'app/common/signals';
// Messages
import {
  alertMessageRead
} from 'app/common/messages';

// Handlers

function* onRead(action) {
  yield put(alertMessageRead(action));
}

// Watchers

function* watchRead() {
  yield takeEvery(S_ALERT_MESSAGE_READ, onRead);
}

export default function* alertMessages() {
  yield [
    watchRead()
  ];
}