import React from 'react';
import DefaultLayout from 'app/common/components/templates/Default';
import Titlebar from 'app/common/components/molecules/TitlebarFactory';
import CampaignTitlebar from '../molecules/CampaignTitlebar';
import Constants from 'app/common/Constants';
import _ from 'lodash';

import Avatar from 'app/common/components/Avatar';
import SteptrackerContainer from '../../containers/molecules/SteptrackerContainer';
import Campaign from '../organisms/Campaign';

const Edit = (props) => {
  if(
    this.props.campaign == null ||
    this.props.brand == null ||
    _.size(this.props.triggers) === 0
  ) {
    return (
      <div>Loading...</div>
    );
  }

  if(
    this.props.campaign.type >> 0 === Constants.CampaignTypes.PDF &&
    _.size(this.props.trainingResults) === 0
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
            campaignType={this.props.campaign.type >> 0}
            brand={this.props.brand}/>
        );
      }}>
      <div className="container">
        <Campaign
          campaignType={this.props.campaign.type >> 0}
          campaign={this.props.campaign}
          triggers={this.props.triggers}
          trainingResults={this.props.trainingResults}
          triggerPayloads={this.props.triggerPayloads}/>
      </div>
    </DefaultLayout>
  );
};
Edit.displayName = 'CampaignsEditPage';
Edit.propTypes = {
};

export default Edit;
