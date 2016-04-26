import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, take, fork, select } from 'redux-saga/effects';
import brandActions from 'app/common/actions/brands';
import campaignActions from 'app/common/actions/campaigns';
import triggerActions from 'app/common/actions/triggers';
import * as routerActions from 'react-router-redux/lib/actions';
import { createCampaign, updateCampaign, getTriggers, getTrainingResults, createTrigger } from 'app/core/sagas/entities';
import { change } from 'redux-form/lib/actions';
import _ from 'lodash';
import Constants from 'app/common/Constants';

function* pdfCampaignFormSubmitCreate(action) {
  // ------------  Campaign ------------ //
  // Send off request
  const campaignTask = yield fork(createCampaign, {
    data: action.payload.values
  });
  // Wait for request to finish
  const campaignAction = yield take(['CAMPAIGNS_CREATE_SUCCESS', 'CAMPAIGNS_CREATE_FAILURE']);

  // Reject the form
  if(campaignAction.type === 'CAMPAIGNS_CREATE_FAILURE') {
    action.payload.reject();
    return;
  }

  // Setting the id field to that of the campaign
  // this will allow us to know if the data is new or old
  // as well as be able to retrieve data on step changes
  let changeAction = change('campaignId', campaignAction.payload.result);
  changeAction.form = campaignAction.payload.form;
  yield put(changeAction);

  // ------------  Triggers ------------ //

  // Now fetch the triggers for the campaign.
  const triggerTask = yield fork(getTriggers, {
    params: {
      campaignId: campaignAction.payload.result
    }
  });
  // Wait for it to finish
  const triggerAction = yield take('TRIGGERS_FETCH_SUCCESS');

  // Setting the id field of the trigger will let us know
  // which trigger this is referring to.
  changeAction = change('triggerId', triggerAction.payload.result[0]);
  changeAction.form = action.payload.form;
  yield put(changeAction);

  // --------  Training Results -------- //
  const trigger = triggerAction.payload.entities.triggers[triggerAction.payload.result[0]];

  const trainingResultTask = yield fork(getTrainingResults, {
    url: trigger.trainingResult,
    parserOptions: {
      triggerId: trigger.triggerId
    }
  });

  // Wait for it to finish
  const trainingResultAction = yield take('TRAINING_RESULTS_FETCH_SUCCESS');

  // Sync all of the pages
  _.times(
    triggerAction.payload.result.length,
    n => action.payload.pagesAddField({})
  );

  // Now go to the correct screen.
  action.payload.updateUI({
    pageView: 'ALL',
    step: 1,
    page: 0
  });
  action.payload.resolve();
}

function* pdfCampaignFormSubmitUpdate(action) {
  const campaignTask = yield fork(updateCampaign, action);
  const campaignAction = yield take(['CAMPAIGNS_UPDATE_SUCCESS', 'CAMPAIGNS_UPDATE_FAILURE']);

  // Reject the form
  if(campaignAction.type === 'CAMPAIGNS_CREATE_FAILURE') {
    action.payload.reject();
    return;
  }

  const triggers = yield select(function(state) {
    return state.entities.get('triggers').filter(x => x.get('campaignId') === action.payload.values.campaignId).toJS();
  });

  // Sync all of the pages
  _.times(
    _.size(triggers),
    n => action.payload.pagesAddField({})
  );

  // Now go to the correct screen.
  action.payload.updateUI({
    pageView: 'ALL',
    step: 1,
    page: 0
  });
  action.payload.resolve();
}

function* pdfCampaignFormSubmit(action) {
  if(action.payload.values.campaignId) {
    yield call(pdfCampaignFormSubmitUpdate, action);
  } else {
    yield call(pdfCampaignFormSubmitCreate, action);
  }
};

function* imageCampaignFormSubmit(action) {
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

  action.payload.resolve();
}

//-----------------------------------------------------------
//----------------------- Watchers --------------------------
//-----------------------------------------------------------

function* watchPdfCampaignFormSubmit() {
  yield takeEvery('CAMPAIGN_PDF_FORM_SUBMIT', pdfCampaignFormSubmit);
};

function* watchImageCampaignFormSubmit() {
  yield takeEvery('CAMPAIGN_IMAGE_FORM_SUBMIT', imageCampaignFormSubmit);
}

function* watchLoadCampaignCreatePage() {
  yield takeEvery('LOAD_CAMPAIGN_CREATE_PAGE', function* () {
    yield put(brandActions.fetch());
  });
};

function* watchLoadCampaignEditPage() {
  yield takeEvery('LOAD_CAMPAIGN_EDIT_PAGE', function* (action) {
    yield put(campaignActions.fetch({
      id: action.payload.campaignId
    }));
    yield put(brandActions.fetch());
    yield put(triggerActions.fetch({
      params: {
        campaignId: action.payload.campaignId
      }
    }));

    const campaignAction = yield take('CAMPAIGNS_FETCH_SUCCESS');
    const triggerAction = yield take('TRIGGERS_FETCH_SUCCESS');

    const campaign = campaignAction.payload.entities.campaigns[action.payload.campaignId];

    switch(campaign.type >> 0) {
      case Constants.CampaignTypes.IMAGE:

        break;
      case Constants.CampaignTypes.PDF:
        const trigger = triggerAction.payload.entities.triggers[triggerAction.payload.result[0]];
        const trainingResultTask = yield fork(getTrainingResults, {
          url: trigger.trainingResult,
          parserOptions: {
            triggerId: trigger.triggerId
          }
        });
        break;
    }

  });
};

// Selecting
function* watchCampaignCreateBrandSelect() {
  yield takeEvery('CAMPAIGN_CREATE_BRAND_SELECT', function* (action) {
    yield put(routerActions.push(`/campaigns/create/${action.payload || ''}`));
  });
};

function* watchCampaignCreateCampaignTypeSelect() {
  yield takeEvery('CAMPAIGN_CREATE_CAMPAIGN_TYPE_SELECT', function* (action) {
    const selectedBrandId = yield select((state) => {
      return state.campaigns.getIn(['create', 'selectedBrandId']);
    });

    let url;
    if(selectedBrandId == null) {
      url = '/campaigns/create';
    } else if(action.payload == null) {
      url = `/campaigns/create/${selectedBrandId}`;
    } else {
      url = `/campaigns/create/${selectedBrandId}/${action.payload}`;
    }
    yield put(routerActions.push(url));
  });
};

export default function* () {
  yield fork(watchLoadCampaignCreatePage);
  yield fork(watchLoadCampaignEditPage);
  // Submittions
  yield fork(watchPdfCampaignFormSubmit);
  yield fork(watchImageCampaignFormSubmit);
  // Selecting
  yield fork(watchCampaignCreateBrandSelect);
  yield fork(watchCampaignCreateCampaignTypeSelect);
};