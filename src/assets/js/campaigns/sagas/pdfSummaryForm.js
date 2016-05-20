import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, take, fork, select } from 'redux-saga/effects';
import { updateTrigger } from 'app/core/sagas/entities';
import _ from 'lodash';
import Constants from 'app/common/Constants';
import * as modalActions from 'app/modal/actions';

function* submit(action) {
  const { values } = action.payload;

  const triggerPayload = _.reduce(values.pages, (result, page, index) => {
    // @TODO: Add coupon support
    result[index] = page.url;
    return result;
  }, {});

  const trigger = yield select(state => {
    return state.entities.triggers[values.triggerId];
  });

  _.assign(trigger, {
    payload: JSON.stringify(triggerPayload)
  });

  let triggerTask = yield fork(updateTrigger, {
    id: values.triggerId,
    data: trigger
  })

  // Wait until the trigger is done
  yield take('TRIGGERS_UPDATE_SUCCESS');

  action.payload.resolve();

  yield put(modalActions.updateModalPath('success'));
  yield put(modalActions.updateModalData({}));
  yield put(modalActions.openModal());
}

//-----------------------------------------------------------
//----------------------- Watchers --------------------------
//-----------------------------------------------------------

function* watchSubmit() {
  yield takeEvery('CAMPAIGN_PDF_SUMMARY_FORM_SUBMIT', submit);
}

export default function* () {
  yield fork(watchSubmit);
}