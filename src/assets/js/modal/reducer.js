import Constants from './Constants';
import { createReducer } from 'redux-create-reducer';
import undoable from 'redux-undo';
import _ from 'lodash';

const Actions = Constants.ActionTypes;
const initialState = {
  isOpen: false,
  path: null,
  data: {}
};

let reducer = createReducer(initialState, {
  [Actions.MODAL_CLOSE]: (state, action) => _.assign({}, state, {
    isOpen: false
  }),
  [Actions.MODAL_OPEN]: (state, action) => _.assign({}, state, {
    isOpen: true
  }),
  [Actions.MODAL_UPDATE_PATH]: (state, action) => _.assign({}, state, {
    path: action.payload.path
  }),
  [Actions.MODAL_UPDATE_DATA]: (state, action) => _.assign({}, state, {
    data: action.payload
  })
});

reducer = undoable(reducer, {
  undoType: Actions.MODAL_UNDO,
  redoType: Actions.MODAL_REDO,
  jumpType: Actions.MODAL_JUMP
});

export default reducer;