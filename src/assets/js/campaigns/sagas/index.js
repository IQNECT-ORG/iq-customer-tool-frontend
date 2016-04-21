import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, take, fork, select } from 'redux-saga/effects';
import brandActions from 'app/common/actions/brands';
import * as routerActions from 'react-router-redux/lib/actions';
import { campaignCreateAsync, getTriggers } from 'app/core/sagas/entities';
import { change } from 'redux-form/lib/actions';

function* basicDetailsFormSubmit(action) {
  // Request
  var campaignResult,
    triggerResult,
    trainingResultsResult;

  // Send off request
  const campaignTask = yield fork(campaignCreateAsync, action);
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

  // Now fetch the triggers for the campaign.
  const triggerTask = yield fork(getTriggers, undefined, undefined, {
    campaignId: campaignAction.payload.result
  });
  // Wait for it to finish
  const triggerAction = yield take('TRIGGERS_FETCH_SUCCESS');

  // Setting the id field of the trigger will let us know
  // which trigger this is referring to.
  changeAction = change('triggerId', triggerAction.payload.result[0]);
  changeAction.form = action.payload.form;
  yield put(changeAction);

  // // Now we need the training results
  // try {
  //   const trigger = triggerResult.entities.triggers[triggerResult.result[0]];
  //   trainingResultsResult = yield trainingResultsApi.getByRaw(trigger.trainingResult, trigger.triggerId);
  //   yield put(trainingResultActions.fetchTrainingResultsSuccess(trainingResultsResult));
  // } catch(err) {
  //   yield put(trainingResultActions.fetchTrainingResultsFailure(err));
  //   return;
  // }
  // // Sync all of the pages
  // _.times(
  //   trainingResultsResult.result.length,
  //   n => action.payload.pagesAddField({})
  // );

  // // Now go to the correct screen.
  // action.payload.updateUI({
  //   pageView: 'ALL',
  //   step: 1,
  //   page: 0
  // });
  action.payload.resolve();
};


function* watchBasicDetailsFormSubmit() {
  yield takeEvery('CAMPAIGN_CREATE_BASIC_DETAILS_FORM_SUBMIT', basicDetailsFormSubmit);
};

function* watchLoadCampaignCreatePage() {
  yield takeEvery('LOAD_CAMPAIGN_CREATE_PAGE', function* () {
    yield put(brandActions.fetch());
  });
};

// Selecting
function* watchCampaignCreateBrandSelect() {
  yield takeEvery('CAMPAIGN_CREATE_BRAND_SELECT', function* (action) {
    yield put(routerActions.push(`/campaign/create/${action.payload || ''}`));
  });
};

function* watchCampaignCreateCampaignTypeSelect() {
  yield takeEvery('CAMPAIGN_CREATE_CAMPAIGN_TYPE_SELECT', function* (action) {
    const selectedBrandId = yield select((state) => {
      return state.campaigns.getIn(['create', 'selectedBrandId']);
    });

    let url;
    if(selectedBrandId == null) {
      url = '/campaign/create';
    } else if(action.payload == null) {
      url = `/campaign/create/${selectedBrandId}`;
    } else {
      url = `/campaign/create/${selectedBrandId}/${action.payload}`;
    }
    yield put(routerActions.push(url));
  });
};

export default function* () {
  yield fork(watchLoadCampaignCreatePage);
  // Submittions
  yield fork(watchBasicDetailsFormSubmit);
  // Selecting
  yield fork(watchCampaignCreateBrandSelect);
  yield fork(watchCampaignCreateCampaignTypeSelect);
};