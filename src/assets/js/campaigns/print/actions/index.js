import Constants from '../Constants';

const Actions = Constants.ActionTypes;

export function addWebsite(url) {
  return {
    type: Actions.CAMPAIGN_PRINT_ADD_WEBSITE,
    url
  };
};

export function openAddWebsiteModal() {
  return {
    type: Actions.CAMPAIGN_PRINT_ADD_WEBSITE_MODAL_OPEN
  };
};

export function closeAddWebsiteModal() {
  return {
    type: Actions.CAMPAIGN_PRINT_ADD_WEBSITE_MODAL_CLOSE
  };
}