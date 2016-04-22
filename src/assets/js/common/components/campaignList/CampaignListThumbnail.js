import React, { Component } from 'react';

class CampaignListThumbnail extends Component {
  render() {
    return (
      <button type="button" onClick={this.props.onClick}>
        <img className="img-fluid" src="http://placehold.it/350x150" />
      </button>
    );
  }
};

export default CampaignListThumbnail;