import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { closeModal, jumpModal } from '../actions';

const render = (props) => {
  const Modal = props.paths[props.path];

  if(Modal == null) {
    return null;
  }

  return (
    <Modal
      isOpen={props.isOpen}
      data={props.data}
      onCloseClick={props.onCloseClick}
      onRestoreClick={props.onRestoreClick}/>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    path: state.modal.present.path,
    isOpen: state.modal.present.isOpen,
    data: state.modal.present.data
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onCloseClick: _ => dispatch(closeModal()),
    onRestoreClick: _ => dispatch(jumpModal(-2))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(render);