import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, take, fork, select } from 'redux-saga/effects';
import * as sessionsApi from 'app/core/services/api/sessions';
import authActions from 'app/auth/actions';
import * as routerActions from 'react-router-redux/lib/actions';
import { HttpError, NotFoundHttpError, BadRequestHttpError } from 'complication/lib/http';
import parser from 'redux-entity-crud/lib/parsers';
import { user as userSchema } from 'app/core/services/api/schemas';

// Auth / Sessions
function* authLoginAsync(action) {
  yield put(authActions.loginRequest());
  try {
    let { json, response } = yield sessionsApi.create(action.payload);
    if(response.status !== 200) {
      throw new NotFoundHttpError('User not found');
    }

    const parsedData = parser(userSchema, json, {});

    yield put(authActions.loginSuccess(parsedData));
    yield put(routerActions.push('/'));
  } catch(err) {
    yield put(authActions.loginFailure(err));
  }
};

function* authForgottenPasswordAsync(action) {
  yield put(authActions.forgottenPasswordRequest());
  try {
    let result = yield usersApi.forgottenPassword(action.payload);
    yield put(authActions.forgottenPasswordSuccess(result));
    yield put(routerActions.push('/reset-password'));
  } catch(err) {
    yield put(authActions.forgottenPasswordFailure(err));
  }
};

function* authResetPasswordAsync(action) {
  yield put(authActions.resetPasswordRequest());
  try {
    let result = yield usersApi.resetPassword(action.payload);
    yield put(authActions.resetPasswordSuccess(result));
  } catch(err) {
    yield put(authActions.resetPasswordFailure(err));
    return;
  }

  yield put(routerActions.push('/signin'));
};

//-----------------------------------------------------------
//----------------------- Watchers --------------------------
//-----------------------------------------------------------

function* watchAuthLogin() {
  yield takeEvery('AUTH_LOGIN', authLoginAsync);
};

function* watchAuthForgottenPassword() {
  yield takeEvery('AUTH_FORGOTTEN_PASSWORD', authForgottenPasswordAsync);
};

function* watchAuthResetPassword() {
  yield takeEvery('AUTH_RESET_PASSWORD', authResetPasswordAsync);
}


export default function* () {
  yield fork(watchAuthLogin);
  yield fork(watchAuthForgottenPassword);
  yield fork(watchAuthResetPassword);
};