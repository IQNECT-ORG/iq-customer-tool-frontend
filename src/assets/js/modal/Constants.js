import keyMirror from 'keymirror';

export default {
  ActionTypes: keyMirror({
    MODAL_CLOSE: null,
    MODAL_OPEN: null,
    MODAL_UPDATE_PATH: null,
    MODAL_UPDATE_DATA: null,
    MODAL_UNDO: null,
    MODAL_REDO: null
  })
};