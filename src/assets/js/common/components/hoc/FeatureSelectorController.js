import React, { Component } from 'react';
import _ from 'lodash';

const FeatureSelectorController = Component => class extends Component {
  static get contextTypes() {
    return {
      store: React.PropTypes.object.isRequired,
    };
  }

  constructor(props, context) {
    super(props, context);

    _.bindAll(this, [
      'handleSelect'
    ]);
  }
  render() {
    return <Component onFeatureClick={this.handleSelect} {...this.props}/>;
  }

  handleSelect(e) {
    console.log('click');
  }
};

export default FeatureSelectorController;