import Constants from '../Constants';
const Actions = Constants.ActionTypes;

export function openModal() {
  return {
    type: Actions.MODAL_OPEN
  };
};

export function closeModal() {
  return {
    type: Actions.MODAL_CLOSE
  };
};

export function updateModalPath(path) {
  return {
    type: Actions.MODAL_UPDATE_PATH,
    payload: {
      path
    }
  };
};