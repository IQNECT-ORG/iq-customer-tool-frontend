import React, { Component } from 'react';
import { connect } from 'react-redux';
import ui from 'redux-ui/transpiled';
import CampaignTypeSelectorList from 'app/common/components/campaignTypeSelector/CampaignTypeSelectorList';
import { selectCampaignType } from '../actions';
import Constants from 'app/common/Constants';
import _ from 'lodash';

const mapStateToProps = (state, ownProps) => {
  return {
    campignTypes: _.values(Constants.CampaignTypes)
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onOptionClick: (e, campaignType) => {
      dispatch(selectCampaignType(campaignType));
    }
  };
}

let DecoratedComponent = CampaignTypeSelectorList;
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);
DecoratedComponent = ui()(DecoratedComponent);

export default DecoratedComponent;