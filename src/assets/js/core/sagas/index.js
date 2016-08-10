import { fork } from 'redux-saga/effects';
// Sagas
import authSaga from 'app/auth/sagas';
import campaignSaga from 'app/campaigns/sagas';
import catalogueSaga from 'app/catalogue/sagas';
import modalSaga from 'app/modal/sagas';
import entitiesSaga from './entities';
import commonSaga from 'app/common/sagas';
import dashboardSaga from 'app/dashboard/sagas';
import analyticsSaga from 'app/analytics/sagas';
import alertMessagesSaga from './alertMessages';

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