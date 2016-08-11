import React from 'react';
import DefaultLayout from 'app/common/components/templates/Default';
import Titlebar from 'app/common/components/molecules/TitlebarFactory';
import CampaignTitlebar from '../molecules/CampaignTitlebar';
import Constants from 'app/common/Constants';

import SteptrackerContainer from '../../containers/molecules/SteptrackerContainer';
import Avatar from 'app/common/components/molecules/Avatar';
import Campaign from '../organisms/Campaign';
import BrandSelectorContainer from '../../containers/molecules/BrandSelectorContainer';
import CampaignTypeSelectorContainer from '../../containers/molecules/CampaignTypeSelectorContainer';

const Create = props => {
  if(props.selectedBrandId == null) {
    return (
      <DefaultLayout
        titleRender={_ => {
          return (
            <Titlebar
              title="Select a Brand"
              ctas={[(
                <button
                  className="btn btn-secondary btn-radius-lg btn-block"
                  type="button"
                  onClick={props.actions.openAddBrandModal}>
                  Add New Brand
                </button>
              )]}/>
          );
        }}>
        <div className="container container--gutter">
          <BrandSelectorContainer/>
        </div>
      </DefaultLayout>
    );
  }

  if(props.selectedCampaignTypeId == null) {
    if(props.selectedBrand == null) {
      return (
        <div>Loading...</div>
      );
    }

    return (
      <DefaultLayout
        titleRender={_ => {
          return (
            <Titlebar
              title="Choose a Campaign Type"
              avatars={[
                { src: props.selectedBrand.imgPreview }
              ]}/>
          );
        }}>
        <div className="container container--gutter">
          <CampaignTypeSelectorContainer/>
        </div>
      </DefaultLayout>
    );
  }

  if(props.selectedBrand == null) {
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
            campaignType={props.selectedCampaignTypeId >> 0}
            brand={props.selectedBrand}/>
        );
      }}>
      <div className="container container--gutter">
        <Campaign
          campaignType={props.selectedCampaignTypeId >> 0}
          selectedBrandId={props.selectedBrandId}/>
      </div>
    </DefaultLayout>
  );
};
Create.displayName = 'CampaignsCreatePage';
Create.propTypes = {

};

export default Create;
