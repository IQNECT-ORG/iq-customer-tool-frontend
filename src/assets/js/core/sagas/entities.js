import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, take, fork, select } from 'redux-saga/effects';
// Actions
import { change } from 'redux-form/lib/actions';
import * as modalActions from 'app/modal/actions';
import brandActions from 'app/common/actions/brands';
import campaignActions from 'app/common/actions/campaigns';
import * as routerActions from 'react-router-redux/lib/actions';
import * as authActions from 'app/auth/actions';
import triggerActions from 'app/common/actions/triggers';
import trainingResultActions from 'app/common/actions/trainingResults';
// API
import * as brandsApi from '../services/api/brands';
import * as sessionsApi from '../services/api/sessions';
import * as usersApi from '../services/api/users';
import * as campaignsApi from '../services/api/campaigns';
import * as triggersApi from '../services/api/triggers';
import * as trainingResultsApi from '../services/api/trainingResults';
// Selectors
import { getPathname } from '../selectors/routing';
//import { getParams } from 'react-router/lib/PatternUtils';
import _ from 'lodash';

// Errors / Exceptions
import { NotFoundError } from '../errors';

function* fetchEntity(entityName, entityActions, apiFn, id, params) {
  yield put(entityActions.fetchRequest(id));

  try {
    const { json, response } = yield call(apiFn, id, params);

    if(response.status === 404) {
      throw new NotFoundError(entityName + ' not found');
    }

    yield put(entityActions.fetchSuccess(json));
  } catch(err) {
    yield put(entityActions.fetchFailure(err));
  }
};

export const findBrand = fetchEntity.bind(null, 'Brand', brandActions, brandsApi.find);
export const filterBrands = fetchEntity.bind(null, 'Brand', brandActions, brandsApi.filter);

// Brands

function* brandsCreateAync(action) {
  yield put(brandActions.createRequest());
  try {
    let result = yield brandsApi.create(action.payload.values);
    yield put(brandActions.brandsCreateSuccess(result));
    action.payload.resolve(result);
    yield put(modalActions.closeModal());
  } catch(err) {
    yield put(brandActions.brandsCreateFailure(err));
  }
};

// Auth / Sessions
function* authLoginAsync(action) {
  //yield put(authActions.fetchRequest());
  try {
    let { data: user, response } = yield sessionsApi.create(action.payload);
    if(response.status !== 200) {
      throw new NotFoundError('User not found');
    }
    yield put(authActions.authLoginSuccess(user));
    yield put(routerActions.push('/'));
  } catch(err) {
    yield put(authActions.authLoginFailure(err));
  }
};

function* authForgottenPasswordAsync(action) {
  // Request
  try {
    let result = yield usersApi.forgottenPassword(action.payload);
    yield put(authActions.authForgottenPasswordSuccess(result));
    yield put(routerActions.push('/reset-password'));
  } catch(err) {
    yield put(authActions.authForgottenPasswordFailure(err));
  }
};

function* authResetPasswordAsync(action) {
  // Request
  try {
    let result = yield usersApi.resetPassword(action.payload);
    yield put(authActions.authResetPasswordSuccess(result));
  } catch(err) {
    yield put(authActions.authResetPasswordFailure(err));
    return;
  }

  yield put(routerActions.push('/signin'));
};

// Campaigns
function* campaignCreateAsync(action) {
  // Request
  var campaignResult,
    triggerResult,
    trainingResultsResult;

  try {
    campaignResult = yield campaignsApi.create(action.payload.values);
    yield put(campaignActions.createCampaignSuccess(campaignResult));
  } catch(err) {
    yield put(campaignActions.createCampaignFailure(err));
    action.payload.reject(err);
    return;
  }

  // Setting the id field to that of the campaign
  // this will allow us to know if the data is new or old
  // as well as be able to retrieve data on step changes
  let changeAction = change('campaignId', campaignResult.result);
  changeAction.form = action.payload.form;
  yield put(changeAction);
  action.payload.resolve(campaignResult);

  // Now fetch the triggers for the campaign.
  try {
    triggerResult = yield triggersApi.getByCampaign(campaignResult.result);
    yield put(triggerActions.fetchTriggersSuccess(triggerResult));

  } catch(err) {
    yield put(triggerActions.fetchTriggersFailure(err));
    return;
  }

  changeAction = change('triggerId', triggerResult.result[0]);
  changeAction.form = action.payload.form;
  yield put(changeAction);

  // Now we need the training results
  try {
    const trigger = triggerResult.entities.triggers[triggerResult.result[0]];
    trainingResultsResult = yield trainingResultsApi.getByRaw(trigger.trainingResult, trigger.triggerId);
    yield put(trainingResultActions.fetchTrainingResultsSuccess(trainingResultsResult));
  } catch(err) {
    yield put(trainingResultActions.fetchTrainingResultsFailure(err));
    return;
  }
  // Sync all of the pages
  _.times(
    trainingResultsResult.result.length,
    n => action.payload.pagesAddField({})
  );

  // Now go to the correct screen.
  action.payload.updateUI({
    pageView: 'ALL',
    step: 1,
    page: 0
  });
};

function* campaignFetchAsync(action) {
  yield put(campaignActions.fetchRequest());
  try {
    let result = yield campaignsApi.get(action.payload);
    yield put(campaignActions.fetchCampaignsSuccess(result));
  } catch(err) {
    yield put(campaignActions.fetchCampaignsFailure(err));
  }
};

function* campaignDeleteAsync(action) {
  yield put(campaignActions.deleteRequest());
  try {
    let result = yield campaignsApi.del(action.payload);
    yield put(campaignActions.deleteCampaignSuccess(result));
  } catch(err) {
    yield put(campaignActions.deleteCampaignFailure(err));
  }
};

// Triggers
function* triggerUpdateAsync(action) {
  yield put(campaignActions.updateRequest());
  try {
    const trigger = action.payload.values;
    let result = yield triggersApi.update(trigger.id, trigger);
    yield put(triggerActions.updateTriggerSuccess(result));
  } catch(err) {
    yield put(triggerActions.updateTriggerFailure(err));
  }
};


//-----------------------------------------------------------
//----------------------- Watchers --------------------------
//-----------------------------------------------------------

// Auth / Sessions
function* watchAuthLogin() {
  yield takeEvery('SESSIONS_CREATE', authLoginAsync);
};

function* watchAuthForgottenPassword() {
  yield takeEvery('AUTH_FORGOTTEN_PASSWORD', authForgottenPasswordAsync);
};

function* watchAuthResetPassword() {
  yield takeEvery('AUTH_RESET_PASSWORD', authResetPasswordAsync);
}

// Brands
function* watchBrandsFetch() {
  yield takeEvery('BRANDS_FETCH', function* (action) {
    if(action.payload && action.payload.id) {
      yield findBrand(action.payload.id, action.payload.params);
    } else {
      yield filterBrands(_.get(action, 'payload.params'));
    }
  });
};

function* watchBrandCreate() {
  yield takeEvery('BRANDS_CREATE', brandsCreateAync);
};

// Campaigns
function* watchCampaignCreate() {
  yield takeEvery('CAMPAIGNS_CREATE', campaignCreateAsync);
};

function* watchCampaignFetch() {
  yield takeEvery('CAMPAIGNS_FETCH', campaignFetchAsync);
};

function* watchCampaignDelete() {
  yield takeEvery('CAMPAIGNS_DELETE', campaignDeleteAsync);
};

// Triggers
function* watchTriggerUpdate() {
  yield takeEvery('TRIGGERS_UPDATE', triggerUpdateAsync);
};

export default function* () {
  yield fork(watchAuthLogin);
  yield fork(watchAuthForgottenPassword);
  yield fork(watchAuthResetPassword);
  yield fork(watchBrandsFetch);
  yield fork(watchBrandCreate);
  yield fork(watchCampaignCreate);
  yield fork(watchCampaignFetch);
  yield fork(watchCampaignDelete);
  yield fork(watchTriggerUpdate);
};