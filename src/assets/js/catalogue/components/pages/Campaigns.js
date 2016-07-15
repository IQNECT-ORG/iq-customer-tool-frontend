import React from 'react';
import DefaultLayout from 'app/common/components/templates/Default';
import Titlebar from 'app/common/components/molecules/TitlebarFactory';
import CampaignListContainer from '../../containers/moleculesCampaignListContainer';

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