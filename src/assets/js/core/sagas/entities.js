import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, take, fork, select } from 'redux-saga/effects';
// Actions
import { change } from 'redux-form/lib/actions';
import * as modalActions from 'app/modal/actions';
import brandActions from 'app/common/actions/brands';
import campaignActions from 'app/common/actions/campaigns';
import * as routerActions from 'react-router-redux/lib/actions';
import triggerActions from 'app/common/actions/triggers';
import trainingResultActions from 'app/common/actions/trainingResults';
// API
import * as brandsApi from '../services/api/brands';
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


// Brands
export const getBrands = fetchEntity.bind(null, 'Brand', brandActions, brandsApi.get);

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

// Campaigns
export const campaignCreateAsync = function* (action) {
  yield put(campaignActions.createRequest());
  try {
    let { json, response } = yield campaignsApi.create(action.payload.values);
    yield put(campaignActions.createSuccess(json));
  } catch(err) {
    yield put(campaignActions.createFailure(err));
  }
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
export const getTriggers = fetchEntity.bind(null, 'Trigger', triggerActions, triggersApi.get);

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

// Brands
function* watchBrandsFetch() {
  yield takeEvery('BRANDS_FETCH', function* (action) {
    const id = _.get(action, 'payload.id');
    const params = _.get(action, 'payload.params');

    yield getBrands(id, params);
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
  yield fork(watchBrandsFetch);
  yield fork(watchBrandCreate);
  yield fork(watchCampaignCreate);
  yield fork(watchCampaignFetch);
  yield fork(watchCampaignDelete);
  yield fork(watchTriggerUpdate);
};