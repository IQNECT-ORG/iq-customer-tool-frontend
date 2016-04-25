import React, { Component } from 'react';

class CampaignListThumbnail extends Component {
  render() {
    return (
      <button className="campaign-list__thumbnail" type="button" onClick={this.props.onClick}>
        <img className src="http://placehold.it/350x150" />
      </button>
    );
  }
};

export default CampaignListThumbnail;