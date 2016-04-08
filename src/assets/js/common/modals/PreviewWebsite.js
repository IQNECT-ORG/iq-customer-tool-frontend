import React, { Component } from 'react';
import Modal from 'app/modal/components/Modal';
import PreviewerContainer from '../containers/PreviewerContainer'

class PreviewWebsite extends Component {
  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onCloseClick}>
        <div className="modal-content modal-content--hollow">
          <div className="modal-body">
            <PreviewerContainer/>

            <button type="button" className="btn btn-primary" onClick={this.props.onCloseClick}>
              Close Preview
            </button>
          </div>
        </div>
      </Modal>
    );
  }
};

export default PreviewWebsite;