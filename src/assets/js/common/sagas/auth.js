import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, take, fork, select } from 'redux-saga/effects';
// Signals
import {
  S_VERIFY_AUTHENTICATION
} from '../signals';
// Messages
import {
  sessionVerifyRequest,
  sessionVerifySuccess,
  sessionVerifyFailure
} from '../messages';
import {
  authAuthenticated
} from 'app/auth/messages';
import * as routerActions from 'react-router-redux/lib/actions';
// Utils
import _ from 'lodash';
// Services
import { get as getSession } from 'app/core/services/api/sessions';
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

//-----------------------------------------------------------
//----------------------- Watchers --------------------------
//-----------------------------------------------------------

function* watchVerify() {
  yield takeLatest(S_VERIFY_AUTHENTICATION, onVerify);
}

export default function* root() {
  yield [
    watchVerify()
  ];
};