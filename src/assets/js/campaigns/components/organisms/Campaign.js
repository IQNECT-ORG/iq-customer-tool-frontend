import React from 'react';
import Constants from 'app/common/Constants';
import PrintCampaignFormContainer from '../containers/print/CampaignFormContainer';
import ImageCampaignFormContainer from '../containers/image/CampaignFormContainer';
import VideoCampaignFormContainer from '../containers/video/CampaignFormContainer';

export default (props) => {
  let form;

  switch(props.campaignType) {
    case Constants.CampaignTypes.IMAGE:
      form = (
        <ImageCampaignFormContainer
          campaign={props.campaign}
          triggers={props.triggers}
          trainingResults={props.trainingResults}
          selectedBrandId={props.selectedBrandId}
          selectedCampaignTypeId={props.campaignType}/>
      );
      break;
    case Constants.CampaignTypes.PDF:
      form = (
        <PrintCampaignFormContainer
          campaign={props.campaign}
          triggers={props.triggers}
          trainingResults={props.trainingResults}
          triggerPayloads={props.triggerPayloads}
          selectedBrandId={props.selectedBrandId}
          selectedCampaignTypeId={props.campaignType}/>
      );
      break;
    case Constants.CampaignTypes.VIDEO:
      form = (
        <VideoCampaignFormContainer
          campaign={props.campaign}
          triggers={props.triggers}
          trainingResults={props.trainingResults}
          selectedBrandId={props.selectedBrandId}
          selectedCampaignTypeId={props.campaignType}/>
      );
      break;
    default:
      throw new Error('Unsupported campaign type');
  }

  return form;
}