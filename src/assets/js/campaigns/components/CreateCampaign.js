import React, { Component } from 'react';
import _ from 'lodash';
import joid from 'joid';
import BasicDetailsFormContainer from '../containers/BasicDetailsFormContainer';
import AllPagesFormContainer from '../containers/AllPagesFormContainer';
import PageDetailsFormContainer from '../containers/PageDetailsFormContainer';
import SummaryFormContainer from '../containers/SummaryFormContainer';

class CreateCampaign extends Component {
  render() {
    return (
      <div>
        {this._renderForm()}
      </div>
    );
  }

  _renderForm() {
    if(this.props.step === 0) {
      return (
        <BasicDetailsFormContainer {...this.props}/>
      );
    }

    if(this.props.step === 1) {
      if(this.props.pageView === 'ALL') {
        return (
          <AllPagesFormContainer {...this.props}/>
        );
      } else if(this.props.pageView === 'DETAIL') {
        return (
          <PageDetailsFormContainer {...this.props}/>
        );
      }
    }

    if(this.props.step === 2) {
      return (
        <SummaryFormContainer {...this.props}/>
      );
    }
  }
};

export default CreateCampaign;