import React from 'react';
import DefaultLayout from 'app/common/components/layouts/Default';
import Titlebar from 'app/common/components/layout/titlebars/Factory';
import CampaignListContainer from '../containers/CampaignListContainer';

const Campaigns = () => {
  return (
    <DefaultLayout
      titleRender={_ => {
        return (
          <Titlebar title="Manage / Campaigns"/>
        );
      }}>
      <div className="container container--gutter">
        <CampaignListContainer/>
      </div>
    </DefaultLayout>
  );
}

export default Campaigns;