import keyMirror from 'keymirror';
import CommonConstants from 'app/common/Constants';

export default {
  ActionTypes: keyMirror(Object.assign({
    SYS_ALERT_CREATE: null
  }, CommonConstants.ActionTypes))
};