import authSaga from './auth';
import campaignSaga from './campaign';
import catalogueSaga from './catalogue';
import modalSaga from './modal';
import entitiesSaga from './entities';

import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, take, fork, select } from 'redux-saga/effects';
// Actions
import { change } from 'redux-form/lib/actions';
import * as modalActions from 'app/modal/actions';
import brandActions from 'app/common/actions/brands';
import campaignActions from 'app/common/actions/campaigns';
import * as routerActions from 'react-router-redux/lib/actions';
import * as authActions from 'app/auth/actions';
import triggerActions from 'app/common/actions/triggers';
import trainingResultActions from 'app/common/actions/trainingResults';
// API
import * as brandsApi from '../services/api/brands';
import * as sessionsApi from '../services/api/sessions';
import * as usersApi from '../services/api/users';
import * as campaignsApi from '../services/api/campaigns';
import * as triggersApi from '../services/api/triggers';
import * as trainingResultsApi from '../services/api/trainingResults';
// Selectors
import { getPathname } from '../selectors/routing';
//import { getParams } from 'react-router/lib/PatternUtils';
import _ from 'lodash';

// Errors / Exceptions
import { NotFoundError } from '../errors';

function* checkForbiddenNavigation(pathname) {
  const whiteList = [
    '/signin',
    '/forgotten-password',
    '/reset-password'
  ];

  if(_.includes(whiteList, pathname) === false) {
    let isLoggedIn = yield select((state) => {
      return state.auth.get('isLoggedIn');
    });

    if(isLoggedIn !== true) {
      //yield put(routerActions.push('/signin'));
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
    while(true) {
      yield take('APP_STARTUP');
      const pathname = yield select(getPathname);
      yield checkForbiddenNavigation(pathname);
    }
  });
  yield fork(function* () {
    while(true) {
      const { payload } = yield take('@@route/LOCATION_CHANGE');
      yield checkForbiddenNavigation(payload.pathname);
    }
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

  yield fork(watchForbiddenNavigation);
};