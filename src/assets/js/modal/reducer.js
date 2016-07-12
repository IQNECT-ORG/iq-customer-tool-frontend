import { createReducer } from 'redux-create-reducer';
import undoable from 'redux-undo';
import _ from 'lodash';
import {
  M_MODAL_CLOSE,
  M_MODAL_OPEN,
  M_MODAL_UPDATE_PATH,
  M_MODAL_UPDATE_DATA,
  M_MODAL_UNDO,
  M_MODAL_REDO,
  M_MODAL_JUMP
} from '../messages';

const initialState = {
  isOpen: false,
  path: null,
  data: {}
};

let reducer = createReducer(initialState, {
  [M_MODAL_CLOSE]: (state, action) => _.assign({}, state, {
    isOpen: false
  }),
  [M_MODAL_OPEN]: (state, action) => _.assign({}, state, {
    isOpen: true
  }),
  [M_MODAL_UPDATE_PATH]: (state, action) => _.assign({}, state, {
    path: action.payload.path
  }),
  [M_MODAL_UPDATE_DATA]: (state, action) => _.assign({}, state, {
    data: action.payload.data
  })
});

reducer = undoable(reducer, {
  undoType: M_MODAL_UNDO,
  redoType: M_MODAL_REDO,
  jumpType: M_MODAL_JUMP
});

export default reducer;