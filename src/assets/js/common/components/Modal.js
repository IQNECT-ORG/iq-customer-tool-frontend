import React, { Component } from 'react';
import ReactModal from 'react-modal';

class Modal extends Component {
  static get contextTypes() {
    return {
    };
  }

  render() {
    return (
      <ReactModal
        className="Modal__Bootstrap modal-dialog"
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
        {...this.props}>
        {this.props.children}
      </ReactModal>
    );
  }
};

export default Modal;