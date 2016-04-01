import React, { Component } from 'react';
import _ from 'lodash';
import { openAddWebsiteModal, nextStep, prevStep } from '../../actions';
//import { login } from '../../actions/auth';
//import serialize from 'form-serialize';

const CreateMagazineCampaignController = Component => class extends Component {
  static get contextTypes() {
    return {
      store: React.PropTypes.object.isRequired,
    };
  }

  constructor(props, context) {
    super(props, context);

    _.bindAll(this, [
      'handleSubmit',
      'handleAddWebsiteClick',
      'handleAddCouponClick',
      'handleBackClick'
    ]);
  }
  render() {
    return (
      <Component
        createMagazineCamaign={{
          onBackClick: this.handleBackClick,
          onSubmit: this.handleSubmit,
          onAddWebsiteClick: this.handleAddWebsiteClick,
          onAddCouponClick: this.handleAddCouponClick
        }}
        {...this.props}/>
    );
  }

  handleBackClick(e) {
    const step = this.props.campaignPrint.getIn(['create','ui','step']);
    if(step > 1) {
      this.context.store.dispatch(prevStep());
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const step = this.props.campaignPrint.getIn(['create','ui','step']);
    if(step < 3) {
      this.context.store.dispatch(nextStep());
    }
  }

  handleAddWebsiteClick(e) {
    this.context.store.dispatch(openAddWebsiteModal());
  }

  handleAddCouponClick(e) {

  }
};

export default CreateMagazineCampaignController;