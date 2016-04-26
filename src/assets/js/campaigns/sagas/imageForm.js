import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, take, fork, select } from 'redux-saga/effects';
import { createCampaign, createTrigger, updateCampaign, updateTrigger } from 'app/core/sagas/entities';
import _ from 'lodash';
import Constants from 'app/common/Constants';
import * as modalActions from 'app/modal/actions';

function* imageCampaignFormSubmitCreate(action) {
  const media = action.payload.values.media;
  const campaignValues = _.omit(action.payload.values, ['media']);

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
  const triggerTask = yield fork(createTrigger, {
    data: {
      campaignId: campaignAction.payload.result,
      brandId: action.payload.values.defaultBrand,
      image: media[0][0],
      triggerType: Constants.TriggerTypes.IMAGE,
      url: action.payload.values.website,
      searchbarTitle: action.payload.values.campaignTitle,

      // Static
      isLogo: 0,
      undeletable: true
    }
  });

  const triggerAction = yield take(['TRIGGERS_CREATE_SUCCESS']);

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
  for(let i = 0; i < _.size(media); i++) {
    let mediaItem = media[i];
    let triggerTask = yield fork(createTrigger, {
      data: {
        campaignId: campaignAction.payload.result,
        brandId: action.payload.values.defaultBrand,
        image: mediaItem[0],
        triggerType: Constants.TriggerTypes.IMAGE,
        url: action.payload.values.website,
        searchbarTitle: action.payload.values.campaignTitle,
        // Static
        isLogo: 0,
        undeletable: true
      }
    });
  }

  // Wait until all of the trigger tasks have completed.
  for(let i = 0; i < _.size(media); i++) {
    yield take(['TRIGGERS_CREATE_SUCCESS']);
  }

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