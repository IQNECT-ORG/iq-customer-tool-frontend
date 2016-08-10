import { createSelector } from 'reselect';

export const getModalAtom = (state) => {
  return state.modal;
};

export const getModalPresent = createSelector(
  getModalAtom,
  (modal) => {
    return modal.present;
  }
);