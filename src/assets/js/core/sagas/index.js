import authSaga from 'app/auth/sagas';
import campaignSaga from 'app/campaigns/sagas';
import catalogueSaga from 'app/catalogue/sagas';
import modalSaga from 'app/modal/sagas';
import entitiesSaga from './entities';
import commonSaga from 'app/common/sagas';
import dashboardSaga from 'app/dashboard/sagas';
import analyticsSaga from 'app/analytics/sagas';
import alertMessagesSaga from './alertMessages';

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

export default function* root() {
  yield fork(entitiesSaga);
  yield fork(authSaga);
  yield fork(campaignSaga);
  yield fork(catalogueSaga);
  yield fork(modalSaga);
  yield fork(commonSaga);
  yield fork(dashboardSaga);
  yield fork(analyticsSaga);
  yield fork(alertMessagesSaga);
};