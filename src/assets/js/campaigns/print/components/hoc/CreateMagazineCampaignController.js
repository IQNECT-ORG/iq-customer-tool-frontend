import React, { Component } from 'react';
import _ from 'lodash';
import { openAddWebsiteModal } from '../../actions';
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
      'handleAddCouponClick'
    ]);
  }
  render() {
    return (
      <Component
        createMagazineCamaign={{
          onSubmit: this.handleSubmit,
          onAddWebsiteClick: this.handleAddWebsiteClick,
          onAddCouponClick: this.handleAddCouponClick
        }}
        {...this.props}/>
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('submit');
  }

  handleAddWebsiteClick(e) {
    this.context.store.dispatch(openAddWebsiteModal());
  }

  handleAddCouponClick(e) {

  }
};

export default CreateMagazineCampaignController;