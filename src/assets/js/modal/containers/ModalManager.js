import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { closeModal, jumpModal } from '../actions';

class ModalManager extends Component {
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
          data={this.props.data}
          onCloseClick={this.props.onCloseClick}
          onRestoreClick={this.props.onRestoreClick}/>
        );
    });
  }

  getCurrentPathOpen(key) {
    return this.props.path === key && this.props.isOpen;
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    path: state.modal.present.get('path'),
    isOpen: state.modal.present.get('isOpen'),
    data: state.modal.present.get('data')
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onCloseClick: _ => dispatch(closeModal()),
    onRestoreClick: _ => dispatch(jumpModal(-2))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalManager);