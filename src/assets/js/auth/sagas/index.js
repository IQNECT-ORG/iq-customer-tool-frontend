import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, take, fork, select } from 'redux-saga/effects';
import * as sessionsApi from 'app/core/services/api/sessions';
import authActions from 'app/auth/actions';
import * as routerActions from 'react-router-redux/lib/actions';
import { NotFoundError } from 'app/core/errors';

// Auth / Sessions
function* authLoginAsync(action) {
  //yield put(authActions.fetchRequest());
  try {
    let { data: user, response } = yield sessionsApi.create(action.payload);
    if(response.status !== 200) {
      throw new NotFoundError('User not found');
    }
    yield put(authActions.loginSuccess(user));
    yield put(routerActions.push('/'));
  } catch(err) {
    yield put(authActions.loginFailure(err));
  }
};

function* authForgottenPasswordAsync(action) {
  // Request
  try {
    let result = yield usersApi.forgottenPassword(action.payload);
    yield put(authActions.authForgottenPasswordSuccess(result));
    yield put(routerActions.push('/reset-password'));
  } catch(err) {
    yield put(authActions.authForgottenPasswordFailure(err));
  }
};

function* authResetPasswordAsync(action) {
  // Request
  try {
    let result = yield usersApi.resetPassword(action.payload);
    yield put(authActions.authResetPasswordSuccess(result));
  } catch(err) {
    yield put(authActions.authResetPasswordFailure(err));
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