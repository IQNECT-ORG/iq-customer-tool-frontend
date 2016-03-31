import React, { Component } from 'react';
import _ from 'lodash';
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
      'handleSubmit'
    ]);
  }
  render() {
    return <Component onCreateMagazineCampaignSubmit={this.handleSubmit} {...this.props}/>;
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('submit');
  }
};

export default CreateMagazineCampaignController;