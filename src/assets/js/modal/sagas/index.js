import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, take, fork, select } from 'redux-saga/effects';
// Signals
import {
  S_MODAL_CLOSE,
  S_MODAL_OPEN,
  S_MODAL_UPDATE_PATH,
  S_MODAL_UPDATE_DATA,
  S_MODAL_UNDO,
  S_MODAL_REDO,
  S_MODAL_JUMP
} from '../signals';
// Messages
import * as modalMessages from '../messages';
// Utils
import _ from 'lodash';

// Handlers
function* onOpen(action) {
  if(_.has(action, 'path') === true) {
    yield put(modalMessages.modalUpdatePath({
      path: action.path
    }));
  }

  if(_.has(action, 'data') === true) {
    yield put(modalMessages.modalUpdateData({
      data: action.data
    }));
  }

  yield put(modalMessages.modalOpen());
}

function* onClose(action) {
  yield put(modalMessages.modalClose());
}

// Watchers
function* watchOpen() {
  yield takeEvery(S_MODAL_OPEN, onOpen);
}

function* watchClose() {
  yield takeEvery(S_MODAL_CLOSE, onClose);
}

export default function* () {
  yield [
    watchOpen(),
    watchClose()
  ];
};