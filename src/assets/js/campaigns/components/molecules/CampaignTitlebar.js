import React from 'react';
import Constants from 'app/common/Constants';
import Titlebar from 'app/common/components/molecules/TitlebarFactory';
import SteptrackerContainer from '../../containers/molecules/SteptrackerContainer';

export default (props) => {
  let icon;
  let steptracker;

  switch(props.campaignType) {
    case Constants.CampaignTypes.IMAGE:
      icon = 'icons8-picture';
      break;
    case Constants.CampaignTypes.PDF:
      icon = 'icons8-magazine';
      steptracker = <SteptrackerContainer/>;
      break;
    case Constants.CampaignTypes.VIDEO:
      icon = 'icons8-movie';

      break;
    default:
      throw new Error('Unsupported campaign type');
  }

  let avatars = [
    { src: props.brand.imgPreview },
    { icon: icon }
  ];

  let title;
  if(props.flow === 'create') {
    title = 'Create Campaign';
  } else if(props.flow === 'edit') {
    title = 'Edit Campaign';
  }

  return (
    <Titlebar
      title={title}
      avatars={avatars}
      steptracker={steptracker}/>
  );
}