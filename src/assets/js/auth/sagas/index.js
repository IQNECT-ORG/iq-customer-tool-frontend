import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, take, fork, select } from 'redux-saga/effects';
// Signals
import {
  S_AUTH_LOGIN,
  S_AUTH_FORGOTTEN_PASSWORD,
  S_AUTH_RESET_PASSWORD
} from '../signals';
// Messages
import {
  authLoginRequest,
  authLoginSuccess,
  authLoginFailure,
  authForgottenPasswordRequest,
  authForgottenPasswordSuccess,
  authForgottenPasswordFailure,
  authResetPasswordRequest,
  authResetPasswordSuccess,
  authResetPasswordFailure
} from '../messages';
// Utils
import parser from 'redux-entity-crud/lib/parsers';
import { HttpError, NotFoundHttpError, BadRequestHttpError } from 'complication/lib/http';
// Services
import * as sessionsApi from 'app/core/services/api/sessions';
import * as routerActions from 'react-router-redux/lib/actions';
import { user as userSchema } from 'app/core/services/api/schemas';

// Handlers
function* onLogin(action) {
  yield put(authLoginRequest());
  try {
    let { json, response } = yield sessionsApi.create(action.payload.values);
    if(response.status !== 200) {
      throw new NotFoundHttpError('User not found');
    }

    const parsedData = parser(userSchema, json, {});

    yield put(authLoginSuccess(parsedData));
    yield put(routerActions.push('/'));
    action.payload.resolve();
  } catch(err) {
    yield put(authLoginFailure(err));
    action.payload.reject();
  }
};

function* onForgottenPassword(action) {
  yield put(authForgottenPasswordRequest());
  try {
    let result = yield usersApi.forgottenPassword(action.payload);
    yield put(authForgottenPasswordSuccess(result));
    yield put(routerActions.push('/reset-password'));
  } catch(err) {
    yield put(authForgottenPasswordFailure(err));
  }
};

function* onResetPassword(action) {
  yield put(authResetPasswordRequest());
  try {
    let result = yield usersApi.resetPassword(action.payload);
    yield put(authResetPasswordSuccess(result));
  } catch(err) {
    yield put(authResetPasswordFailure(err));
    return;
  }

  yield put(routerActions.push('/signin'));
};

//-----------------------------------------------------------
//----------------------- Watchers --------------------------
//-----------------------------------------------------------

function* watchLogin() {
  yield takeEvery(S_AUTH_LOGIN, onLogin);
};

function* watchForgottenPassword() {
  yield takeEvery(S_AUTH_FORGOTTEN_PASSWORD, onForgottenPassword);
};

function* watchResetPassword() {
  yield takeEvery(S_AUTH_RESET_PASSWORD, onResetPassword);
}


export default function* () {
  yield fork(watchLogin);
  yield fork(watchForgottenPassword);
  yield fork(watchResetPassword);
};