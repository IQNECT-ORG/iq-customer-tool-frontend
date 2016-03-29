import Constants from '../Constants';

const Actions = Constants.ActionTypes;

export function openModal(path) {
  return {
    type: Actions.MODAL_OPEN,
    path
  }
};

export function closeModal() {
  return {
    type: Actions.MODAL_CLOSE
  };
}