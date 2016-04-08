import Constants from '../Constants';
import { normalize, Schema, arrayOf } from 'normalizr';

const Actions = Constants.ActionTypes;

const job = new Schema('jobs', {
  idAttribute: 'job_id'
});
const screenshot = new Schema('screenshots');

job.define({
  screenshots: arrayOf(screenshot)
});

export function createJobRequest(url) {
  const data = {
    "job_id":"13b93a14db22872fcb5fd1c86b730a51197db319",
    "win_res": "1024x768",
    "mac_res": "1920x1080",
    "quality": "compressed",
    "wait_time": 5,
    "orientation": "portrait",
    "screenshots": [
     {
       "os":"Windows",
       "os_version":"XP",
       "browser":"ie",
       "id":"be9989892cbba9b9edc2c95f403050aa4996ac6a",
       "state":"pending",
       "browser_version":"7.0",
       "url":"www.google.com"
     }
    ]
  };

  return {
    type: Actions.PREVIEW_JOB_REQUEST_SUCCESS,
    payload: normalize(data, job)
  };
};

export function requestJobStatusUpdate(id) {
  const data = {
    "job_id":"13b93a14db22872fcb5fd1c86b730a51197db319",
    "state":"done",
    "win_res": "1024x768",
    "mac_res": "1920x1080",
    "quality": "compressed",
    "wait_time": 5,
    "screenshots": [
      {
        "os":"Windows",
        "os_version":"XP",
        "browser":"ie",
        "browser_version":"7.0",
        "id":"be9989892cbba9b9edc2c95f403050aa4996ac6a",
        "state":"done",
        "url":"www.google.com",
        "thumb_url":"https://www.browserstack.com/screenshots/13b93a14db22872fcb5fd1c86b730a51197db319/thumb_winxp_ie_7.0.jpg",
        "image_url":"https://www.browserstack.com/screenshots/13b93a14db22872fcb5fd1c86b730a51197db319/winxp_ie_7.0.png",
        "created_at":"2013-03-14 16:25:45 UTC"
      }
     ]
  };

  return {
    type: 'PREVIEW_JOB_STATUS_SUCCESS',
    payload: normalize(data, job)
  };
};

export function createJobRequestAndPollStatusUpdate(url) {
  return (dispatch, state) => {
    dispatch(createJobRequest(url));
    dispatch(requestJobStatusUpdate());
  };
};