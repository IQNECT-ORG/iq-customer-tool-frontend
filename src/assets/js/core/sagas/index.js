import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, take, fork, select } from 'redux-saga/effects';
import * as brandActions from 'app/common/actions/brands';
import * as brandsApi from '../services/api/brands';
import * as routerActions from 'react-router-redux/lib/actions';
import { getPathname } from '../selectors/routing';
//import { getParams } from 'react-router/lib/PatternUtils';
import * as sessionsApi from '../services/api/sessions';
import * as authActions from 'app/auth/actions';
import _ from 'lodash';
import * as usersApi from '../services/api/users';

function* brandsFetchAsync() {
  try {
    let brands = yield brandsApi.getBrands();
    yield put(brandActions.brandsFetchSuccess(brands));
  } catch(err) {
    yield put(brandActions.brandsFetchFailure(err));
  }
};

function* authLoginAsync(action) {
  try {
    let user = yield sessionsApi.createSession(action.payload);
    yield put(authActions.authLoginSuccess(user));
    yield put(routerActions.push('/'));
  } catch(err) {
    yield put(authActions.authLoginFailure(err));
  }
};

function* authForgottenPasswordAsync(action) {
  try {
    let result = yield usersApi.forgottenPassword(action.payload);
    yield put(authActions.authForgottenPasswordSuccess(result));
    yield put(routerActions.push('/reset-password'));
  } catch(err) {
    yield put(authActions.authForgottenPasswordFailure(err));
  }
};

function* authResetPasswordAsync(action) {
  try {
    let result = yield usersApi.resetPassword(action.payload);
    yield put(authActions.authResetPasswordSuccess(result));
    yield put(routerActions.push('/signin'));
  } catch(err) {
    yield put(authActions.authResetPasswordFailure(err));
  }
}

function* checkForbiddenNavigation(pathname) {
  const whiteList = [
    '/signin',
    '/forgotten-password',
    '/reset-password'
  ];

  if(_.includes(whiteList, pathname) === false) {
    let isLoggedIn = yield select((state) => {
      return state.auth.get('isLoggedIn');
    });

    if(isLoggedIn !== true) {
      yield put(routerActions.push('/signin'));
    }
  }
};


function* startup() {
};

//-----------------------------------------------------------
//----------------------- Watchers --------------------------
//-----------------------------------------------------------

function* watchForbiddenNavigation() {
  yield fork(function* () {
    while(true) {
      yield take('APP_STARTUP');
      const pathname = yield select(getPathname);
      yield checkForbiddenNavigation(pathname);
    }
  });
  yield fork(function* () {
    while(true) {
      const { payload } = yield take('@@route/LOCATION_CHANGE');
      yield checkForbiddenNavigation(payload.pathname);
    }
  });
};

function* watchAuthLoginRequest() {
  yield takeLatest('AUTH_LOGIN_REQUEST', authLoginAsync);
};

function* watchAuthForgottenPasswordRequest() {
  yield takeLatest('AUTH_FORGOTTEN_PASSWORD_REQUEST', authForgottenPasswordAsync);
};

function* watchAuthResetPasswordRequest() {
  yield takeLatest('AUTH_RESET_PASSWORD_REQUEST', authResetPasswordAsync);
}

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
  yield takeEvery('CAMPAIGN_CREATE_BRAND_SELECT', function* (action) {
    yield put(routerActions.push(`/campaign/create/${action.payload || ''}`));
  });
}

function* watchCampaignCreateCampaignTypeSelect() {
  yield takeEvery('CAMPAIGN_CREATE_CAMPAIGN_TYPE_SELECT', function* (action) {
    const selectedBrandId = yield select((state) => {
      return state.campaigns.getIn(['create', 'selectedBrandId']);
    });

    let url;
    if(selectedBrandId == null) {
      url = '/campaign/create';
    } else if(action.payload == null) {
      url = `/campaign/create/${selectedBrandId}`;
    } else {
      url = `/campaign/create/${selectedBrandId}/${action.payload}`;
    }
    yield put(routerActions.push(url));
  });
}

export default function* root() {
  yield fork(startup);

  yield fork(watchForbiddenNavigation);

  yield fork(watchAuthLoginRequest);
  yield fork(watchAuthForgottenPasswordRequest);
  yield fork(watchAuthResetPasswordRequest);

  yield fork(watchLoadCampaignPrintCreate);
  yield fork(watchBrandsFetchRequest);

  yield fork(watchCampaignCreateBrandSelect);
  yield fork(watchCampaignCreateCampaignTypeSelect);
};