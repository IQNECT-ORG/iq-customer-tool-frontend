import { call, put, take, fork, select } from 'redux-saga/effects';
import campaignActions from 'app/common/actions/campaigns';
import triggerActions from 'app/common/actions/triggers';
import _ from 'lodash';

export function* load() {
  yield put(campaignActions.fetch());
  const campaignAction = yield take('CAMPAIGNS_FETCH_SUCCESS');

  // Ok. Let me level with you.
  // There is no pagination on this screen, which is bad.
  // I would rather not do X requests just to get the thumbnail
  // so the easy way is to get all of the triggers via batch filtering
  // however, then the URI gets massive and it all breaks.
  // So here we are, now having to cheat by creating batches of requests.
  // Enjoy :)
  const batches = _.chunk(campaignAction.payload.result, 10);

  yield _.map(batches, function*(batch) {
    yield put(triggerActions.fetch({
      params: {
        campaignId: batch
      }
    }));
  });
}