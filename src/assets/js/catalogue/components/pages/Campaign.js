import React from 'react';
import DefaultLayout from 'app/common/components/templates/Default';
import Titlebar from 'app/common/components/molecules/TitlebarFactory';
import CampaignDetails from 'app/common/containers/organisms/CampaignDetailsContainer';

const Campaign = (props) => {
  return (
    <DefaultLayout
      titleRender={_ => {
        return (
          <Titlebar
            title="Manage / Campaigns"/>
        );
      }}>
      <div className="container container--gutter">
        <CampaignDetails campaignId={props.routeParams.campaignId}/>
      </div>
    </DefaultLayout>
  );
};

export default Campaign;