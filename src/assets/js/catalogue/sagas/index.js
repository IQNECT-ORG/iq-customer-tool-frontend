import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, take, fork, select } from 'redux-saga/effects';
import brandActions from 'app/common/actions/brands';
import * as routerActions from 'react-router-redux/lib/actions';

function* watchLoadCatalogueBrandPage() {
  yield takeEvery('LOAD_CATALOGUE_BRAND_PAGE', function* () {
    let result = yield put(brandActions.fetch());
  });
};

export default function* () {
  yield fork(watchLoadCatalogueBrandPage);
};