import Constants from '../Constants';
import { closeModal } from 'app/modal/actions';

const Actions = Constants.ActionTypes;

export function addWebsite(url) {
  return (dispatch) => {
    dispatch({
      type: Actions.CAMPAIGN_PRINT_ADD_WEBSITE,
      url
    });

    dispatch(closeModal());
  };
};