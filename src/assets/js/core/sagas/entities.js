import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, take, fork, select } from 'redux-saga/effects';
import _ from 'lodash';
import ValidationError from 'yup/lib/util/validation-error';
// Actions
import brandActions from 'app/common/actions/brands';
import campaignActions from 'app/common/actions/campaigns';
import triggerActions from 'app/common/actions/triggers';
import trainingResultActions from 'app/common/actions/trainingResults';
import couponActions from 'app/common/actions/coupons';
// Signals
import {
  S_DELETE_ENTITY
} from 'app/common/signals';
// API
import * as brandsApi from '../services/api/brands';
import * as usersApi from '../services/api/users';
import * as campaignsApi from '../services/api/campaigns';
import * as triggersApi from '../services/api/triggers';
import * as trainingResultsApi from '../services/api/trainingResults';
import * as couponsApi from '../services/api/coupons';
// Utils
import { EntitieNames } from 'app/common/Constants';
// Parsers
import { triggerParser, trainingResultsParser, countParser } from '../services/api/parsers';
import parser from 'redux-entity-crud/lib/parsers';
import * as schemas from '../services/api/schemas';

import { fetchEntity, createEntity, updateEntity, deleteEntity, countEntity } from 'redux-entity-crud/lib/sagas';

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

export const countCampaigns = countEntity.bind(
  null,
  {
    entityName: 'Campaign',
    entityActions: campaignActions,
    apiFn: campaignsApi.count,
    parser: countParser
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

export const countTriggers = countEntity.bind(
  null,
  {
    entityName: 'Trigger',
    entityActions: triggerActions,
    apiFn: triggersApi.count,
    parser: countParser
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

// Handlers
function* onDeleteEntity(action) {
  const canDelete = confirm('Are you sure you want to delete this entity?');
  if(canDelete === false) {
    return;
  }

  const sagaMap = {
    [EntitieNames.CAMPAIGN]: deleteCampaign
  };

  const saga = sagaMap[action.payload.entity];

  yield call(saga, action.payload);
}

//-----------------------------------------------------------
//----------------------- Watchers --------------------------
//-----------------------------------------------------------

// Brands
function* watchBrandsFetch() {
  yield takeEvery(brandActions.BRANDS_FETCH, function* (action) {
    yield getBrands({
      id: _.get(action, 'payload.id'),
      params: _.get(action, 'payload.params')
    });
  });
};

function* watchBrandCreate() {
  yield takeEvery(brandActions.BRANDS_CREATE, createBrand);
};

// Campaigns
function* watchCampaignCreate() {
  yield takeEvery(campaignActions.CAMPAIGNS_CREATE, createCampaign);
};

function* watchCampaignFetch() {
  yield takeEvery(campaignActions.CAMPAIGNS_FETCH, function* (action) {
    yield getCampaigns({
      id: _.get(action, 'payload.id'),
      params: _.get(action, 'payload.params')
    });
  });
};

function* watchCampaignDelete() {
  yield takeEvery(campaignActions.CAMPAIGNS_DELETE, deleteCampaign);
};

// Triggers
function* watchTriggersFetch() {
  yield takeEvery(triggerActions.TRIGGERS_FETCH, function* (action) {
    yield getTriggers({
      id: _.get(action, 'payload.id'),
      params: _.get(action, 'payload.params')
    });
  });
};

function* watchTriggerUpdate() {
  yield takeEvery(triggerActions.TRIGGERS_UPDATE, updateTrigger);
};

// Coupons
function* watchCouponsFetch() {
  yield takeEvery(couponActions.COUPONS_FETCH, function* (action) {
    yield getCoupons({
      id: _.get(action, 'payload.id'),
      params: _.get(action, 'payload.params')
    });
  });
};

function* watchDeleteEntity() {
  yield takeEvery(S_DELETE_ENTITY, onDeleteEntity);
}


export default function* () {
  yield [
    watchBrandsFetch(),
    watchBrandCreate(),
    watchCampaignCreate(),
    watchCampaignFetch(),
    watchCampaignDelete(),
    watchTriggerUpdate(),
    watchTriggersFetch(),
    watchCouponsFetch(),
    watchDeleteEntity()
  ];
};