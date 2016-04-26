import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, take, fork, select } from 'redux-saga/effects';
import _ from 'lodash';
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

// Errors / Exceptions
import { NotFoundError } from '../errors';

// Parsers
import parser, { triggerParser, trainingResultsParser } from '../services/api/parsers';
import * as schemas from '../services/api/schemas';

function* fetchEntity(config, options) {
  yield put(config.entityActions.fetchRequest(options.url || options.id));

  try {
    const { json, response } = yield call(config.apiFn, options.url || options.id, options.params);

    if(response.status === 404) {
      throw new NotFoundError(config.entityName + ' not found');
    }

    yield put(config.entityActions.fetchSuccess(config.parser(json, options.parserOptions)));
  } catch(err) {
    yield put(config.entityActions.fetchFailure(err));
  }
};

function* createEntity(config, options) {
  yield put(config.entityActions.createRequest(options.url || options.id));

  try {
    const { json, response } = yield call(config.apiFn, options.data, options.params);

    if(response.status === 404) {
      throw new NotFoundError(config.entityName + ' not found');
    }

    yield put(config.entityActions.createSuccess(config.parser(json, options.parserOptions)));
  } catch(err) {
    yield put(config.entityActions.createFailure(err));
  }
};

function* updateEntity(config, options) {
  yield put(config.entityActions.updateRequest(options.url || options.id));

  try {
    const { json, response } = yield call(config.apiFn, options.data, options.params);

    if(response.status === 404) {
      throw new NotFoundError(config.entityName + ' not found');
    }

    yield put(config.entityActions.updateSuccess(config.parser(json, options.parserOptions)));
  } catch(err) {
    yield put(config.entityActions.updateFailure(err));
  }
};

function* deleteEntity(config, options) {
  yield put(config.entityActions.deleteRequest(options.url || options.id));

  try {
    const { json, response } = yield call(config.apiFn, options.url || options.id, options.params);

    if(response.status === 404) {
      throw new NotFoundError(config.entityName + ' not found');
    }

    yield put(config.entityActions.deleteSuccess(config.parser(json, options.parserOptions)));
  } catch(err) {
    yield put(config.entityActions.deleteFailure(err));
  }
};


// Brands
export const getBrands = fetchEntity.bind(
  null,
  {
    entityName: 'Brand',
    entityActions: brandActions,
    apiFn: brandsApi.get,
    parser: parser.bind(null, schemas.brand)
  }
);

export const createBrand = createEntity.bind(
  null,
  {
    entityName: 'Brand',
    entityActions: brandActions,
    apiFn: brandsApi.create,
    parser: parser.bind(null, schemas.brand)
  }
);

export const updateBrand = updateEntity.bind(
  null,
  {
    entityName: 'Brand',
    entityActions: brandActions,
    apiFn: brandsApi.update,
    parser: parser.bind(null, schemas.brand)
  }
);

export const deleteBrand = deleteEntity.bind(
  null,
  {
    entityName: 'Brand',
    entityActions: brandActions,
    apiFn: brandsApi.del,
    parser: parser.bind(null, schemas.brand)
  }
);

// Campaigns
export const getCampaigns = fetchEntity.bind(
  null,
  {
    entityName: 'Campaign',
    entityActions: campaignActions,
    apiFn: campaignsApi.get,
    parser: parser.bind(null, schemas.campaign)
  }
);

export const createCampaign = createEntity.bind(
  null,
  {
    entityName: 'Campaign',
    entityActions: campaignActions,
    apiFn: campaignsApi.create,
    parser: parser.bind(null, schemas.campaign)
  }
);

export const updateCampaign = updateEntity.bind(
  null,
  {
    entityName: 'Campaign',
    entityActions: campaignActions,
    apiFn: campaignsApi.update,
    parser: parser.bind(null, schemas.campaign)
  }
);

export const deleteCampaign = deleteEntity.bind(
  null,
  {
    entityName: 'Campaign',
    entityActions: campaignActions,
    apiFn: campaignsApi.del,
    parser: parser.bind(null, schemas.campaign)
  }
);

// Triggers
export const getTriggers = fetchEntity.bind(
  null,
  {
    entityName: 'Trigger',
    entityActions: triggerActions,
    apiFn: triggersApi.get,
    parser: triggerParser.bind(null, schemas.trigger)
  }
);

export const createTrigger = createEntity.bind(
  null,
  {
    entityName: 'Trigger',
    entityActions: triggerActions,
    apiFn: triggersApi.create,
    parser: parser.bind(null, schemas.trigger)
  }
);

export const updateTrigger = updateEntity.bind(
  null,
  {
    entityName: 'Trigger',
    entityActions: triggerActions,
    apiFn: triggersApi.update,
    parser: parser.bind(null, schemas.trigger)
  }
);

export const deleteTrigger = deleteEntity.bind(
  null,
  {
    entityName: 'Trigger',
    entityActions: triggerActions,
    apiFn: triggersApi.del,
    parser: parser.bind(null, schemas.trigger)
  }
);

// Training Results
export const getTrainingResults = fetchEntity.bind(
  null,
  {
    entityName: 'Training Result',
    entityActions: trainingResultActions,
    apiFn: trainingResultsApi.get,
    parser: trainingResultsParser.bind(null, schemas.trainingResult)
  }
);


//-----------------------------------------------------------
//----------------------- Watchers --------------------------
//-----------------------------------------------------------

// Brands
function* watchBrandsFetch() {
  yield takeEvery('BRANDS_FETCH', function* (action) {
    yield getBrands({
      id: _.get(action, 'payload.id'),
      params: _.get(action, 'payload.params')
    });
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
  yield takeEvery('CAMPAIGNS_FETCH', function* (action) {
    yield getCampaigns({
      id: _.get(action, 'payload.id'),
      params: _.get(action, 'payload.params')
    });
  });
};

function* watchCampaignDelete() {
  yield takeEvery('CAMPAIGNS_DELETE', campaignDeleteAsync);
};

// Triggers
function* watchTriggersFetch() {
  yield takeEvery('TRIGGERS_FETCH', function* (action) {
    yield getTriggers({
      id: _.get(action, 'payload.id'),
      params: _.get(action, 'payload.params')
    });
  });
};

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
  yield fork(watchTriggersFetch);
};