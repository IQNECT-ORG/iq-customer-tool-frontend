import React, { Component } from 'react';
import Modal from '../Modal';
import ModalController from '../hoc/ModalController';
import AddBrandForm from '../common/forms/AddBrandForm'

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
            <AddBrandForm/>
          </div>
        </div>
      </Modal>
    );
  }
};

export default ModalController(AddBrand);