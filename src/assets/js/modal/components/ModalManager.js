import React, { Component } from 'react';
import _ from 'lodash';

class ModalManager extends Component {
  static get contextTypes() {
    return {
    };
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
};

export default ModalManager;