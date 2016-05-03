import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, take, fork, select } from 'redux-saga/effects';
import _ from 'lodash';
// Actions
import brandActions from 'app/common/actions/brands';
import campaignActions from 'app/common/actions/campaigns';
import triggerActions from 'app/common/actions/triggers';
import trainingResultActions from 'app/common/actions/trainingResults';
import couponActions from 'app/common/actions/coupons';
// API
import * as brandsApi from '../services/api/brands';
import * as usersApi from '../services/api/users';
import * as campaignsApi from '../services/api/campaigns';
import * as triggersApi from '../services/api/triggers';
import * as trainingResultsApi from '../services/api/trainingResults';
import * as couponsApi from '../services/api/coupons';

// Parsers
import { triggerParser, trainingResultsParser } from '../services/api/parsers';
import parser from 'redux-entity-crud/lib/parsers';
import * as schemas from '../services/api/schemas';

import { fetchEntity, createEntity, updateEntity, deleteEntity } from 'redux-entity-crud/lib/sagas';

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

// Coupons
export const getCoupons = fetchEntity.bind(
  null,
  {
    entityName: 'Coupon',
    entityActions: couponActions,
    apiFn: couponsApi.get,
    parser: parser.bind(null, schemas.coupon)
  }
);

export const createCoupon = createEntity.bind(
  null,
  {
    entityName: 'Coupon',
    entityActions: couponActions,
    apiFn: couponsApi.create,
    parser: parser.bind(null, schemas.coupon)
  }
);

export const updateCoupon = updateEntity.bind(
  null,
  {
    entityName: 'Coupon',
    entityActions: couponActions,
    apiFn: couponsApi.update,
    parser: parser.bind(null, schemas.coupon)
  }
);

export const deleteCoupon = deleteEntity.bind(
  null,
  {
    entityName: 'Coupon',
    entityActions: couponActions,
    apiFn: couponsApi.del,
    parser: parser.bind(null, schemas.coupon)
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
  yield takeEvery('BRANDS_CREATE', createBrand);
};

// Campaigns
function* watchCampaignCreate() {
  yield takeEvery('CAMPAIGNS_CREATE', createCampaign);
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
  yield takeEvery('CAMPAIGNS_DELETE', deleteCampaign);
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
  yield takeEvery('TRIGGERS_UPDATE', updateTrigger);
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