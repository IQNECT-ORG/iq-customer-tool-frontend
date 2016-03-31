import React, { Component } from 'react';
import _ from 'lodash';
//import { login } from '../../actions/auth';
//import serialize from 'form-serialize';

const BrandSelectorController = Component => class extends Component {
  static get contextTypes() {
    return {
      store: React.PropTypes.object.isRequired,
    };
  }

  constructor(props, context) {
    super(props, context);

    _.bindAll(this, [
      'handleBrandClick'
    ]);
  }
  render() {
    return <Component onBrandClick={this.handleBrandClick} {...this.props}/>;
  }

  handleBrandClick(e) {
    console.log('click');
  }
};

export default BrandSelectorController;