import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, take, fork, select } from 'redux-saga/effects';
import { base as baseAPI } from 'app/core/services/api/analytics';
import filterFormSaga from './filterForm';

function* load() {
  const filters = yield select(state => state.analytics.filters);
  yield call(updateData, filters);
}

function* updateData(filters) {
  try {
    let {json, response } = yield call(baseAPI, {
      types: {
        allSearches: 1,
        filter: filters
      }
    });

    yield put({
      type: 'ANALYTICS_UPDATE_DATA_ALL_SEARCHES',
      payload: json.allSearches
    });
  } catch(err) {
    throw err;
  }
}

function* watchLoad() {
  yield takeEvery('LOAD_ANALYTICS_OVERVIEW_PAGE', load);
}

function* watchFiltersUpdate() {
  yield takeEvery('ANALYTICS_FILTERS_UPDATE', function* () {
    const filters = yield select(state => state.analytics.filters);
    yield call(updateData, filters);
  });
}

export default function* () {
  yield fork(watchLoad);
  yield fork(watchFiltersUpdate);
  yield fork(filterFormSaga);
};