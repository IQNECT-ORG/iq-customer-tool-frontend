import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, take, fork } from 'redux-saga/effects';
import * as brandActions from 'app/common/actions/brands';
import * as brandsApi from '../services/api/brands';

function* brandsFetchAsync() {
  try {
    let brands = yield brandsApi.getBrands();
    yield put(brandActions.brandsFetchSuccess(brands));
  } catch(err) {
    yield put(brandActions.brandsFetchFailure(err));
  }
};


function* startup() {
  console.log('startup');
};

//-----------------------------------------------------------
//----------------------- Watchers --------------------------
//-----------------------------------------------------------

function* watchBrandsFetchRequest() {
  yield takeLatest('BRANDS_FETCH_REQUEST', brandsFetchAsync);
};

function* watchLoadCampaignPrintCreate() {
  while(true) {
    yield take('CAMPAIGN_PRINT_LOAD');
    yield fork(function* () {
      yield put(brandActions.brandsFetchRequest());
    });
  }
};

export default function* root() {
  yield fork(startup);
  yield fork(watchLoadCampaignPrintCreate);
  yield fork(watchBrandsFetchRequest);
};