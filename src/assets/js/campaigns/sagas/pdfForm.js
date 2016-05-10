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
import * as modalActions from 'app/modal/actions';
import { takeN } from 'app/core/sagas/utils';

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
      triggerType: Constants.TriggerTypes.PDF,
      searchbarTitle: values.name
    },
    _.pick(values, [
      'brandId',
      'url'
    ])
  );

  // Validation

  // Sending Data

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

  // Setting the id field to that of the campaign
  // this will allow us to know if the data is new or old
  // as well as be able to retrieve data on step changes
  let changeAction = change('campaignId', campaignAction.payload.result);
  changeAction.form = campaignAction.payload.form;
  yield put(changeAction);


  // ------------  Triggers ------------ //
  trigger.campaignId = campaignAction.payload.result
  yield call(uploadTriggers, [trigger]);

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
  const fetchedTrigger = triggerAction.payload.entities.triggers[triggerAction.payload.result[0]];

  const trainingResultTask = yield fork(getTrainingResults, {
    url: fetchedTrigger.trainingResult,
    parserOptions: {
      triggerId: fetchedTrigger.triggerId
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

function* update(action) {
  const campaignTask = yield fork(updateCampaign, {
    id: action.payload.values.campaignId,
    data: action.payload.values
  });
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
  yield takeEvery('CAMPAIGN_PDF_FORM_SUBMIT', submit);
};

export default function* () {
  yield fork(watchSubmit);
};