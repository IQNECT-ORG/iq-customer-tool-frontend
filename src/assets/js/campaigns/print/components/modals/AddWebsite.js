import React, { Component } from 'react';
import Modal from 'app/common/components/Modal';
import ModalController from 'app/common/components/hoc/ModalController';
import AddWebsiteForm from 'app/common/components/forms/AddWebsiteForm'

class AddBrand extends Component {
  static get contextTypes() {
    return {
    };
  }

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onModalClose}>
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" aria-label="Close" onClick={this.props.onModalClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div className="modal-body">
            <AddWebsiteForm/>
          </div>
        </div>
      </Modal>
    );
  }
};

export default ModalController(AddBrand);