import React, { Component } from 'react';
import { connect } from 'react-redux';
import ui from 'redux-ui/transpiled';
import CreateCampaign from '../components/CreateCampaign';
import BasicDetailsFormContainer from './BasicDetailsFormContainer';
import AllPagesFormContainer from './AllPagesFormContainer';
import PageDetailsFormContainer from './PageDetailsFormContainer';

const mapStateToProps = (state, ownProps) => {
  return {
    step: ownProps.ui.step,
    components: [
      BasicDetailsFormContainer,
      AllPagesFormContainer,
      PageDetailsFormContainer
    ]
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  };
};

let DecoratedComponent = CreateCampaign;
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);
DecoratedComponent = ui({
  key: 'createCampaign',
  state: {
    step: 1
  }
})(DecoratedComponent);

export default DecoratedComponent;