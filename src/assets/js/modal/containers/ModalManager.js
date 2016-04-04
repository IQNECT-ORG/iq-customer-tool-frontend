import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { closeModal } from '../actions';

class ModalManager extends Component {
  static get contextTypes() {
    return {
    };
  }

  render() {
    return (
      <div>
        {this._renderModals()}
      </div>
    );
  }

  _renderModals() {
    return _.map(this.props.paths, (Modal, key) => {
      return (
        <Modal
          key={key}
          isOpen={this.getCurrentPathOpen(key)}
          onCloseClick={this.props.onCloseClick}/>
        );
    });
  }

  getCurrentPathOpen(key) {
    return this.props.path === key && this.props.isOpen;
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    path: state.modal.get('path'),
    isOpen: state.modal.get('isOpen')
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onCloseClick: _ => dispatch(closeModal())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalManager);