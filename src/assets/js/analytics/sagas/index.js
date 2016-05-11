import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, take, fork, select } from 'redux-saga/effects';
import { base as baseAPI } from 'app/core/services/api/analytics';

function* load() {
  const {json, response } = yield call(baseAPI, {
    types: {
      allSearches: 1
    }
  });

  yield put({
    type: 'ANALYTICS_UPDATE_DATA_ALL_SEARCHES',
    payload: json.allSearches
  });
}

function* watchLoad() {
  yield takeEvery('LOAD_ANALYTICS_OVERVIEW_PAGE', load);
}

export default function* () {
  yield fork(watchLoad);
};