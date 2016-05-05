import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, take, fork, select } from 'redux-saga/effects';
import { createCampaign, createTrigger, updateCampaign, updateTrigger, validateEntity } from 'app/core/sagas/entities';
import _ from 'lodash';
import Constants from 'app/common/Constants';
import * as modalActions from 'app/modal/actions';
import * as validatorSchemas from 'app/core/services/validators/schemas';
import ValidationError from 'yup/lib/util/validation-error';

function* uploadTriggers(action, campaignAction) {
  const media = action.payload.values.media;
  const triggerPayload = {
    meta: {
      version: '2.0.0'
    },
    couponId: action.payload.values.couponId
  };

  for(let i = 0; i < _.size(media); i++) {
    let mediaItem = media[i];

    let triggerData = _.omitBy({
      campaignId: campaignAction.payload.result,
      brandId: action.payload.values.defaultBrand,
      image: mediaItem[0],
      triggerType: Constants.TriggerTypes.IMAGE,
      url: action.payload.values.website,
      searchbarTitle: action.payload.values.campaignTitle,
      payload: (action.payload.values.couponId) ? JSON.stringify(triggerPayload) : undefined,

      // Static
      isLogo: 0,
      undeletable: true
    }, _.isUndefined);

    let triggerTask = yield fork(createTrigger, {
      data: triggerData
    });
  }

  // Wait until all of the trigger tasks have completed.
  for(let i = 0; i < _.size(media); i++) {
    yield take(['TRIGGERS_CREATE_SUCCESS']);
  }
}

function* imageCampaignFormSubmitCreate(action) {
  const campaignValues = _.omit(action.payload.values, ['media']);

  try {
    let values = yield call([validatorSchemas.campaign, validatorSchemas.campaign.validate], campaignValues);
  } catch(err) {
    if(err instanceof ValidationError) {
      yield put({
        type: 'CAMPAIGN_VALIDATE_INVALID',
        payload: err,
        error: true
      });
      return;
    } else {
      throw err;
    }
  }

  // ------------  Campaign ------------ //
  // Send off request
  const campaignTask = yield fork(createCampaign, {
    data: campaignValues
  });
  // Wait for request to finish
  const campaignAction = yield take(['CAMPAIGNS_CREATE_SUCCESS', 'CAMPAIGNS_CREATE_FAILURE']);

  // Reject the form
  if(campaignAction.type === 'CAMPAIGNS_CREATE_FAILURE') {
    action.payload.reject();
    return;
  }

  // ------------  Triggers ------------ //
  yield call(uploadTriggers, action, campaignAction);

  action.payload.resolve();

  yield put(modalActions.updateModalPath('success'));
  yield put(modalActions.updateModalData({}));
  yield put(modalActions.openModal());
};

function* imageCampaignFormSubmitUpdate(action) {
  const media = action.payload.values.media;
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

function* imageCampaignFormSubmit(action) {
  if(action.payload.values.campaignId) {
    yield call(imageCampaignFormSubmitUpdate, action);
  } else {
    yield call(imageCampaignFormSubmitCreate, action);
  }
};

//-----------------------------------------------------------
//----------------------- Watchers --------------------------
//-----------------------------------------------------------

function* watchImageCampaignFormSubmit() {
  yield takeEvery('CAMPAIGN_IMAGE_FORM_SUBMIT', imageCampaignFormSubmit);
}

export default function* () {
  yield fork(watchImageCampaignFormSubmit);
};