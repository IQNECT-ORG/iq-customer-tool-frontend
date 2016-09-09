import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, take, fork, select } from 'redux-saga/effects';
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
import { getTrainingResults } from 'app/core/sagas/entities';

// Sagas
export function formatFilters(filters) {
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

export function* updateData(filters) {
  yield call(updateSearchData, filters);
  yield call(updateFrames, filters);
}

export function* updateSearchData(filters) {
  const formattedFilters = formatFilters(filters);

  try {
    let {json, response } = yield call(baseAPI, {
      types: {
        allSearches: 1,
      },
      filter: formattedFilters
    });

    yield put(analyticsUpdateDataAllSearches(json.allSearches));
  } catch(err) {
    throw err;
  }
}

export function* updateFrames(filters) {
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

export function dataToCSV(data) {
  return 'data:text/csv;charset=utf-8,' + data;
}

export function downloadCSVToFile(uri) {
  var link = document.createElement('a');
  link.setAttribute('href', uri);
  link.setAttribute('download', 'analytics.csv');
  document.body.appendChild(link); // Required for FF
  link.click();
  document.body.removeChild(link);
}