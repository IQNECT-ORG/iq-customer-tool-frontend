import React, { Component } from 'react';
import ReactModal from 'react-modal';
import classNames from 'classnames';

class Modal extends Component {
  static defaultProps = {
    size: 'md'
  }

  render() {
    const sizeClass = `modal-${this.props.size}`;
    const className = classNames('Modal__Bootstrap modal-dialog', sizeClass, this.props.className);
    return (
      <ReactModal
        style={{
          overlay: {
            position: null,
            top: null,
            left: null,
            right: null,
            bottom: null,
            backgroundColor: null,
          },
          content: {
            position: null,
            top: null,
            left: null,
            right: null,
            bottom: null,
            border: null,
            background: null,
            overflow: null,
            WebkitOverflowScrolling: null,
            borderRadius: null,
            outline: null,
            padding: null
          }
        }}
        {...this.props}
        className={className}>
        {this.props.children}
      </ReactModal>
    );
  }
};

export default Modal;