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

export function updateModalData(data) {
  return {
    type: Actions.MODAL_UPDATE_DATA,
    payload: data
  };
}

export function undoModal() {
  return {
    type: Actions.MODAL_UNDO
  };
};

export function jumpModal(index) {
  return {
    type: Actions.MODAL_JUMP,
    index
  };
};