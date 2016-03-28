import Constants from '../Constants';

const Actions = Constants.ActionTypes;

export function toggleMenu() {
  return {
    type: Actions.DRAW_NAV_TOGGLE_MENU
  };
};