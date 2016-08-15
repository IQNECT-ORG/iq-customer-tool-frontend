import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, take, fork, select } from 'redux-saga/effects';
// Signals
import {
  S_VERIFY_AUTHENTICATION,
  S_SESSION_LOGOUT
} from '../signals';
// Messages
import {
  sessionVerifyRequest,
  sessionVerifySuccess,
  sessionVerifyFailure,
  sessionLogoutRequest,
  sessionLogoutSuccess,
  sessionLogoutFailure
} from '../messages';
import {
  authAuthenticated
} from 'app/auth/messages';
import * as routerActions from 'react-router-redux/lib/actions';
// Utils
import _ from 'lodash';
// Services
import {
  get as getSession,
  del as deleteSession
} from 'app/core/services/api/sessions';
import { user as userSchema } from 'app/core/services/api/schemas';
import parser from 'redux-entity-crud/lib/parsers';
// Selectors
// Sagas

function* onVerify(action) {
  yield put(sessionVerifyRequest());
  try {
    const { response, json } = yield call(getSession);

    yield put(sessionVerifySuccess());

    // Check status
    if(response.status === 401) {
      // The user is logged out
      yield put(routerActions.push('/signin'));
      return;
    }

    // The user is logged in
    const parsedData = yield call(parser, userSchema, json, {});
    yield put(authAuthenticated(parsedData));

  } catch(err) {
    yield put(sessionVerifyFailure(err));
  }
}

function* onLogout(action) {
    yield put(sessionLogoutRequest());
  try {
    const { response, json } = yield call(deleteSession);

    yield put(sessionLogoutSuccess());
    yield put(routerActions.push('/signin'));
  } catch(err) {
    yield put(sessionLogoutFailure(err));
  }
}

//-----------------------------------------------------------
//----------------------- Watchers --------------------------
//-----------------------------------------------------------

function* watchVerify() {
  yield takeLatest(S_VERIFY_AUTHENTICATION, onVerify);
}

function* watchLogout() {
  yield takeLatest(S_SESSION_LOGOUT, onLogout);
}

export default function* root() {
  yield [
    watchVerify(),
    watchLogout()
  ];
};