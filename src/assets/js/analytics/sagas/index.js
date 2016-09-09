import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, take, fork, select } from 'redux-saga/effects';
// Signals
import {
  S_ANALYTICS_LOAD_OVERVIEW_PAGE,
  S_ANALYTICS_FILTERS_UPDATE,
  S_ANALYTICS_DOWNLOAD_CSV
} from '../signals';
// Messages
import {
  analyticsUpdateDataAllSearches,
  analyticsUpdateFilters
} from '../messages';
// Utils
import _ from 'lodash';
import moment from 'moment';
// Services
import {
  base as baseAPI,
  csv as csvAPI
} from 'app/core/services/api/analytics';
// Sagas
import * as campaignListSaga from 'app/common/sagas/campaignList';
import { getTrainingResults } from 'app/core/sagas/entities';
import filterFormSaga from './filterForm';
import * as sagas from './sagas';

// Handlers
function* onLoad(action) {
  const filters = yield select(state => state.analytics.filters);

  yield call(campaignListSaga.load);
  //yield call(sagas.updateData, filters);
}

function* onUpdateFilters(action) {
  yield put(analyticsUpdateFilters(action.payload));

  const filters = yield select(state => state.analytics.filters);
  yield call(sagas.updateData, filters);
}

function* onDownloadCSV(action) {
  const formattedFilters = formatFilters(action.payload.filters);

  try {
    let { text, response } = yield call(csvAPI, {
      types: {
        allSearches: 1,
      },
      filter: formattedFilters
    });

    const encodedUri = encodeURI(dataToCSV(text));
    downloadCSVToFile(encodedUri);
  } catch(err) {
    throw err;
  }
}

// Watchers

function* watchLoad() {
  yield takeEvery(S_ANALYTICS_LOAD_OVERVIEW_PAGE, onLoad);
}

function* watchFiltersUpdate() {
  yield takeEvery(S_ANALYTICS_FILTERS_UPDATE, onUpdateFilters);
}

function* watchDownloadCSV() {
  yield takeEvery(S_ANALYTICS_DOWNLOAD_CSV, onDownloadCSV);
}

export default function* () {
  yield fork(watchLoad);
  yield fork(watchFiltersUpdate);
  yield fork(watchDownloadCSV);
  yield fork(filterFormSaga);
};