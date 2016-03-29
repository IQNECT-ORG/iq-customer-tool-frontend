import React, { Component } from 'react';
import Modal from '../Modal';
import ModalController from '../hoc/ModalController';

class AddBrand extends Component {
  static get contextTypes() {
    return {
    };
  }

  render() {
    return (
      <Modal
        isOpen={true}
        onRequestClose={this.props.onModalClose}>
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" aria-label="Close" onClick={this.props.onModalClose}>
              <span aria-hidden="true">&times;</span>
            </button>
            <h4 className="modal-title">Modal title</h4>
          </div>

          <div className="modal-body">
            <p>One fine body... What? &hellip;</p>
          </div>
        </div>
      </Modal>
    );
  }
};

export default ModalController(AddBrand);