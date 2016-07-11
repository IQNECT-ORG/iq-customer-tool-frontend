import { createAction } from 'redux-actions';

export const M_MODAL_CLOSE = 'M_MODAL_CLOSE';
export const M_MODAL_OPEN = 'M_MODAL_OPEN';
export const M_MODAL_UPDATE_PATH = 'M_MODAL_UPDATE_PATH';
export const M_MODAL_UPDATE_DATA = 'M_MODAL_UPDATE_DATA';
export const M_MODAL_UNDO = 'M_MODAL_UNDO';
export const M_MODAL_REDO = 'M_MODAL_REDO';
export const M_MODAL_JUMP = 'M_MODAL_JUMP';

export const modalOpen = createAction(M_MODAL_OPEN);
export const modalClose = createAction(M_MODAL_CLOSE);
export const modalUpdatePath = createAction(M_MODAL_UPDATE_PATH);
export const modalUpdateData = createAction(M_MODAL_UPDATE_DATA);
export const modalUndo = createAction(M_MODAL_UNDO);
export const modalJump = createAction(M_MODAL_JUMP);
