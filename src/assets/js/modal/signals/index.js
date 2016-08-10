import { createAction } from 'redux-actions';

export const S_MODAL_CLOSE = 'S_MODAL_CLOSE';
export const S_MODAL_OPEN = 'S_MODAL_OPEN';
export const S_MODAL_UPDATE_PATH = 'S_MODAL_UPDATE_PATH';
export const S_MODAL_UPDATE_DATA = 'S_MODAL_UPDATE_DATA';
export const S_MODAL_UNDO = 'S_MODAL_UNDO';
export const S_MODAL_REDO = 'S_MODAL_REDO';
export const S_MODAL_JUMP = 'S_MODAL_JUMP';

export const modalOpen = createAction(S_MODAL_OPEN);
export const modalClose = createAction(S_MODAL_CLOSE);
export const modalUpdatePath = createAction(S_MODAL_UPDATE_PATH);
export const modalUpdateData = createAction(S_MODAL_UPDATE_DATA);
export const modalUndo = createAction(S_MODAL_UNDO);
export const modalJump = createAction(S_MODAL_JUMP);
