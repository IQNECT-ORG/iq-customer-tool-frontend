import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, take, fork, select } from 'redux-saga/effects';
import { createCampaign, createTrigger, updateCampaign, updateTrigger, validateEntity } from 'app/core/sagas/entities';
import _ from 'lodash';
import Constants from 'app/common/Constants';
import * as validatorSchemas from 'app/core/services/validators/schemas';
import ValidationError from 'yup/lib/util/validation-error';
import { takeN } from 'app/core/sagas/utils';
import {
  S_CAMPAIGN_VIDEO_FORM_SUBMIT
} from '../signals';

function* uploadTriggers(triggers) {
  for(let i = 0; i < _.size(triggers); i++) {
    let trigger = triggers[i];

    let triggerTask = yield fork(createTrigger, {
      data: trigger
    });
  }

  // Wait until all of the trigger tasks have completed.
  yield takeN(_.size(triggers), ['TRIGGERS_CREATE_SUCCESS']);
}

function* create(action) {
  const { values } = action.payload;

  // Data Models
  const campaign = _.assign({
    defaultBrand: values.brandId
  },_.pick(values, [
    'name',
    'type'
  ]));

  const trigger = _.assign(
    {
      media: values.media[0], // Only get the first video in a filelist
      triggerType: Constants.TriggerTypes.VIDEO,
      searchbarTitle: values.name
    },
    _.pick(values, [
      'brandId',
      'url'
    ])
  );

  // Validation
  // Campaign
  try {
    let values = yield call([validatorSchemas.campaign, validatorSchemas.campaign.validate], campaign);
  } catch(err) {
    if(err instanceof ValidationError) {
      yield put({
        type: 'CAMPAIGN_VALIDATE_INVALID',
        payload: err,
        error: true
      });
      action.payload.reject({
        [err.path]: err.message
      });
      return;
    } else {
      throw err;
    }
  }

  // Trigger
  try {
    let values = yield call([validatorSchemas.trigger, validatorSchemas.trigger.validate], trigger);
  } catch(err) {
    if(err instanceof ValidationError) {
      yield put({
        type: 'TRIGGER_VALIDATE_INVALID',
        payload: err,
        error: true
      });
      action.payload.reject({
        [err.path]: err.message
      });
      return;
    } else {
      throw err;
    }
  }

  // ------------  Campaign ------------ //
  // Send off request
  const campaignTask = yield fork(createCampaign, {
    data: campaign
  });
  // Wait for request to finish
  const campaignAction = yield take(['CAMPAIGNS_CREATE_SUCCESS', 'CAMPAIGNS_CREATE_FAILURE']);

  // Reject the form
  if(campaignAction.type === 'CAMPAIGNS_CREATE_FAILURE') {
    action.payload.reject();
    return;
  }

  // ------------  Triggers ------------ //
  // Now we can assign the campaign id
  trigger.campaignId = campaignAction.payload.result
  yield call(uploadTriggers, [trigger]);

  action.payload.resolve();

  // yield put(modalActions.updateModalPath('success'));
  // yield put(modalActions.updateModalData({}));
  // yield put(modalActions.openModal());
};

function* update(action) {
  const { values } = action.payload;
  const media = values.media;
  const campaignValues = _.omit(action.payload.values, ['media']);

  // ------------  Campaign ------------ //
  // Send off request
  const campaignTask = yield fork(updateCampaign, {
    id: action.payload.values.campaignId,
    data: campaignValues
  });
  // Wait for request to finish
  const campaignAction = yield take(['CAMPAIGNS_UPDATE_SUCCESS', 'CAMPAIGNS_UPDATE_FAILURE']);

  // Reject the form
  if(campaignAction.type === 'CAMPAIGNS_UPDATE_FAILURE') {
    action.payload.reject();
    return;
  }

  // ------------  Triggers ------------ //
  yield call(uploadTriggers, action, campaignAction);

  // @TODO: Update all of the old triggers to the new url

  action.payload.resolve();

  // yield put(modalActions.updateModalPath('success'));
  // yield put(modalActions.updateModalData({}));
  // yield put(modalActions.openModal());
};

function* submit(action) {
  if(action.payload.values.campaignId) {
    yield call(update, action);
  } else {
    yield call(create, action);
  }
};

//-----------------------------------------------------------
//----------------------- Watchers --------------------------
//-----------------------------------------------------------

function* watchSubmit() {
  yield takeEvery(S_CAMPAIGN_VIDEO_FORM_SUBMIT, submit);
}

export default function* () {
  yield fork(watchSubmit);
};