import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, take, fork, select } from 'redux-saga/effects';
import * as brandActions from 'app/common/actions/brands';
import * as brandsApi from '../services/api/brands';
import * as routerActions from 'react-router-redux/lib/actions';
//import { getPathname } from '../selectors/routing';
//import { getParams } from 'react-router/lib/PatternUtils'

function* brandsFetchAsync() {
  try {
    //let brands = yield brandsApi.getBrands();
    //yield put(brandActions.brandsFetchSuccess(brands));
    yield put(brandActions.brandsFetchSuccess([
      {
        id: 1,
        name: 'McDonalds'
      },
      {
        id: 2,
        name: 'Esquire'
      }
    ]));
  } catch(err) {
    yield put(brandActions.brandsFetchFailure(err));
  }
};


function* startup() {
  
};

//-----------------------------------------------------------
//----------------------- Watchers --------------------------
//-----------------------------------------------------------

// function* watchNavigation() {
//   while(true) {
//     const { payload } = yield take('@@route/LOCATION_CHANGE');
//     console.log(getParams('/campaign/create/:brandId', payload.pathname));

//     // if(payload.pathname === '/campaign/create/') {

//     // }
//   }
// };

function* watchBrandsFetchRequest() {
  yield takeLatest('BRANDS_FETCH_REQUEST', brandsFetchAsync);
};

function* watchLoadCampaignPrintCreate() {
  while(true) {
    yield take('CAMPAIGN_CREATE_LOAD');
    yield fork(function* () {
      yield put(brandActions.brandsFetchRequest());
    });
  }
};

function* watchCampaignCreateBrandSelect() {
  yield takeLatest('CAMPAIGN_CREATE_BRAND_SELECT', function* (action) {
    yield put(routerActions.push(`/campaign/create/${action.payload || ''}`));
  });
}

function* watchCampaignCreateCampaignTypeSelect() {
  yield takeLatest('CAMPAIGN_CREATE_CAMPAIGN_TYPE_SELECT', function* (action) {
    const selectedBrandId = yield select((state) => {
      return state.campaigns.getIn(['create', 'selectedBrandId']);
    });
    yield put(routerActions.push(`/campaign/create/${selectedBrandId}/${action.payload}`));
  });
}

export default function* root() {
  yield fork(startup);
  yield fork(watchLoadCampaignPrintCreate);
  yield fork(watchBrandsFetchRequest);
  yield fork(watchCampaignCreateBrandSelect);
  yield fork(watchCampaignCreateCampaignTypeSelect);
};