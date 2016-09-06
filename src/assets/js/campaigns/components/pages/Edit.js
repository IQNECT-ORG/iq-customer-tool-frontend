import React from 'react';
import DefaultLayout from 'app/common/components/templates/Default';
import CampaignTitlebar from '../molecules/CampaignTitlebar';
import Constants from 'app/common/Constants';
import _ from 'lodash';

import Avatar from 'app/common/components/molecules/Avatar';
import SteptrackerContainer from '../../containers/molecules/SteptrackerContainer';
import Campaign from '../organisms/Campaign';

const Edit = props => {
  if(
    props.campaign == null ||
    props.brand == null ||
    _.size(props.triggers) === 0
  ) {
    return (
      <div>Loading...</div>
    );
  }

  if(
    props.campaign.type >> 0 === Constants.CampaignTypes.PDF &&
    _.size(props.trainingResults) === 0
  ) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <DefaultLayout
      titleRender={_ => {
        return (
          <CampaignTitlebar
            flow="create"
            campaignType={props.campaign.type >> 0}
            brand={props.brand}/>
        );
      }}>
      <div className="container">
        <Campaign
          campaignType={props.campaign.type >> 0}
          campaign={props.campaign}
          triggers={props.triggers}
          trainingResults={props.trainingResults}
          triggerPayloads={props.triggerPayloads}/>
      </div>
    </DefaultLayout>
  );
};
Edit.displayName = 'CampaignsEditPage';
Edit.propTypes = {
};

export default Edit;
