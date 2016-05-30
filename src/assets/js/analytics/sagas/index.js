import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, take, fork, select } from 'redux-saga/effects';
import {
  base as baseAPI,
  csv as csvAPI
} from 'app/core/services/api/analytics';
import filterFormSaga from './filterForm';
import _ from 'lodash';
import moment from 'moment';
import * as campaignListSaga from 'app/common/sagas/campaignList';
import { getTrainingResults } from 'app/core/sagas/entities';

function formatFilters(filters) {
  function formatDate(filter) {
    return moment(_.parseInt(filter))
      .startOf('day')
      .format('YYYY-MM-DD');
  }

  return _.transform(filters, (result, filter, key) => {
    switch(key) {
      case 'periodStart':
        result.ymd0 = formatDate(filter);
        break;
      case 'periodEnd':
        result.ymd1 = formatDate(filter);
        break;
      default:
        result[key] = filter;
    }
  }, {});
}

function* load() {
  const filters = yield select(state => state.analytics.filters);

  yield call(campaignListSaga.load);
  //yield call(updateData, filters);
}

function* updateData(filters) {
  yield call(updateSearchData, filters);
  yield call(updateFrames, filters);
}

function* updateSearchData(filters) {
  const formattedFilters = formatFilters(filters);

  try {
    let {json, response } = yield call(baseAPI, {
      types: {
        allSearches: 1,
      },
      filter: formattedFilters
    });

    yield put({
      type: 'ANALYTICS_UPDATE_DATA_ALL_SEARCHES',
      payload: json.allSearches
    });
  } catch(err) {
    throw err;
  }
}

function* updateFrames(filters) {
  const triggers = yield select(state => state.entities.triggers);
  const trigger = _.find(triggers, x => x.campaignId === filters.campaignId);

  if(trigger == null) {
    return;
  }

  if(_.has(trigger, 'trainingResult') && trigger.trainingResult != null) {
    yield call(getTrainingResults, {
      url: trigger.trainingResult,
      parserOptions: {
        triggerId: trigger.triggerId
      }
    });
  }
}

function dataToCSV(data) {
  return 'data:text/csv;charset=utf-8,' + data;
}

function downloadCSVToFile(uri) {
  var link = document.createElement('a');
  link.setAttribute('href', uri);
  link.setAttribute('download', 'analytics.csv');
  document.body.appendChild(link); // Required for FF
  link.click();
  document.body.removeChild(link);
}

function* downloadCSV(action) {
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

function* watchLoad() {
  yield takeEvery('LOAD_ANALYTICS_OVERVIEW_PAGE', load);
}

function* watchFiltersUpdate() {
  yield takeEvery('ANALYTICS_FILTERS_UPDATE', function* () {
    const filters = yield select(state => state.analytics.filters);
    yield call(updateData, filters);
  });
}

function* watchDownloadCSV() {
  yield takeEvery('ANALYICS_DOWNLOAD_CSV', downloadCSV);
}

export default function* () {
  yield fork(watchLoad);
  yield fork(watchFiltersUpdate);
  yield fork(watchDownloadCSV);
  yield fork(filterFormSaga);
};