import React, { Component } from 'react';
import { connect } from 'react-redux';
import ui from 'redux-ui/transpiled';
import CampaignTypeSelectorList from 'app/common/components/campaignTypeSelector/CampaignTypeSelectorList';
import { selectCampaignType } from '../actions';

const mapStateToProps = (state, ownProps) => {
  return {
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onOptionClick: (e, campaignType) => {
      dispatch(selectCampaignType(campaignType.id));
    }
  };
}

let DecoratedComponent = CampaignTypeSelectorList;
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);
DecoratedComponent = ui()(DecoratedComponent);

export default DecoratedComponent;