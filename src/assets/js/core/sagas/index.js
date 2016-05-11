import authSaga from 'app/auth/sagas';
import campaignSaga from 'app/campaigns/sagas';
import catalogueSaga from 'app/catalogue/sagas';
import modalSaga from 'app/modal/sagas';
import entitiesSaga from './entities';
import commonSaga from 'app/common/sagas';
import dashboardSaga from 'app/dashboard/sagas';
import analyticsSaga from 'app/analytics/sagas';

import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, take, fork, select } from 'redux-saga/effects';
// Actions
import * as routerActions from 'react-router-redux/lib/actions';
import * as authActions from 'app/auth/actions';
// API
import * as sessionsApi from '../services/api/sessions';
// Selectors
import { getPathname } from '../selectors/routing';
import { isLoggedIn } from '../selectors/auth';
//import { getParams } from 'react-router/lib/PatternUtils';
import _ from 'lodash';
import { user as userSchema } from 'app/core/services/api/schemas';
import parser from 'redux-entity-crud/lib/parsers';

function* checkForbiddenNavigation(pathname) {
  const whiteList = [
    '/signin',
    '/forgotten-password',
    '/reset-password'
  ];
  if(_.includes(whiteList, pathname) === false) {
    // Local check
    let loggedIn = yield select(isLoggedIn);

    if(loggedIn === true) {
      // We can skip this check as we already know the
      // user is logged in
      return;
    }

    // Now do remote check.
    try {
      const { json, response } = yield call(sessionsApi.get);

      // Check status
      if(response.status === 401) {
        // The user is logged out
        yield put(routerActions.push('/signin'));
        return;
      }

      // The user is logged in
      const parsedData = parser(userSchema, json, {});
      yield put({
        type: 'AUTH_AUTHENTICATE_SUCCESS',
        payload: parsedData
      });

    } catch(err) {
    }
  }
};

function* startup() {
};

//-----------------------------------------------------------
//----------------------- Watchers --------------------------
//-----------------------------------------------------------

function* watchForbiddenNavigation() {
  yield fork(function* () {
    yield take('APP_STARTUP');
    const pathname = yield select(getPathname);
    yield checkForbiddenNavigation(pathname);
  });
  yield fork(function* () {
    yield takeEvery('@@route/LOCATION_CHANGE', function*(action) {
      yield checkForbiddenNavigation(action.payload.pathname);
    });
  });
};

export default function* root() {
  yield fork(startup);

  // External
  yield fork(entitiesSaga);
  yield fork(authSaga);
  yield fork(campaignSaga);
  yield fork(catalogueSaga);
  yield fork(modalSaga);
  yield fork(commonSaga);
  yield fork(dashboardSaga);
  yield fork(analyticsSaga);

  yield fork(watchForbiddenNavigation);
};