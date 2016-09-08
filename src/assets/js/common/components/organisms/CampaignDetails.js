import React, { PropTypes } from 'react';

const CampaignDetails = props => {
  return (
    <div className="campaign-details">
      <ul>
        {_.map(props.campaign, (value, key) => {
          return (
            <li key={key}>
              {key}: {'' + value}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
CampaignDetails.displayName = 'CampaignDetails';
CampaignDetails.propTypes = {

};

export default CampaignDetails;