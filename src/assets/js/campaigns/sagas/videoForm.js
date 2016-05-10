import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, take, fork, select } from 'redux-saga/effects';
import { createCampaign, createTrigger, updateCampaign, updateTrigger, validateEntity } from 'app/core/sagas/entities';
import _ from 'lodash';
import Constants from 'app/common/Constants';
import * as modalActions from 'app/modal/actions';
import * as validatorSchemas from 'app/core/services/validators/schemas';
import ValidationError from 'yup/lib/util/validation-error';

function* uploadTriggers(triggers) {
  for(let i = 0; i < _.size(triggers); i++) {
    let trigger = triggers[i];

    let triggerTask = yield fork(createTrigger, {
      data: trigger
    });
  }

  // Wait until all of the trigger tasks have completed.
  for(let i = 0; i < _.size(triggers); i++) {
    yield take(['TRIGGERS_CREATE_SUCCESS']);
  }
}

function* create(action) {
  const { values } = action.payload;

  // Setting up data models
  const campaign = _.assign({
    defaultBrand: values.brandId
  },_.pick(values, ['name']));

  const triggerPayload = {
    meta: {
      version: '2.0.0'
    },
    couponId: values.couponId
  };

  const triggerPayloadFormatted = JSON.stringify(triggerPayload);

  const triggers = _.reduce(values.media, (result, media) => {
    const trigger = _.assign(
      {
        image: media[0], // Only get the first image in a filelist
        triggerType: Constants.TriggerTypes.IMAGE,
        searchbarTitle: values.name,
        payload: (values.couponId) ?
          triggerPayloadFormatted : undefined,
        // Static
        isLogo: 0,
        undeletable: true
      },
      _.pick(values, [
        'brandId',
        'url'
      ])
    );
    result.push(trigger);
    return result;
  }, []);

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

  // Triggers
  if(_.size(triggers) === 0) {
    yield put({
      type: 'ADD_ERROR',
      payload: new Error('An image is required'),
      error: true
    });
    action.payload.reject({
      'media[0]': 'An image is required'
    });
    return;
  }
  for(let i = 0; i < _.size(triggers); i++) {
    let trigger = triggers[i];
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
  _.each(triggers, trigger => {
    trigger.campaignId = campaignAction.payload.result
  });
  yield call(uploadTriggers, triggers);

  action.payload.resolve();

  yield put(modalActions.updateModalPath('success'));
  yield put(modalActions.updateModalData({}));
  yield put(modalActions.openModal());
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

  yield put(modalActions.updateModalPath('success'));
  yield put(modalActions.updateModalData({}));
  yield put(modalActions.openModal());
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
  yield takeEvery('CAMPAIGN_VIDEO_FORM_SUBMIT', submit);
}

export default function* () {
  yield fork(watchSubmit);
};