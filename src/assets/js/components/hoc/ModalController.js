import React, { Component } from 'react';
import _ from 'lodash';
import { closeModal } from '../../actions/modal';

const ModalController = Component => class extends Component {
  static get contextTypes() {
    return {
      store: React.PropTypes.object.isRequired,
    };
  }

  constructor(props, context) {
    super(props, context);

    _.bindAll(this, [
      'handleModalClose'
    ]);
  }
  render() {
    return <Component onModalClose={this.handleModalClose} {...this.props}/>;
  }

  handleModalClose(e) {
    this.context.store.dispatch(closeModal());
  }
};

export default ModalController;