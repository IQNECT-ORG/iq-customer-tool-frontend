import React, { Component } from 'react';
import Modal from 'app/modal/components/Modal';
import PreviewCoupon from '../components/coupon/PreviewCoupon';

class PreviewCouponModal extends Component {
  render() {
    return (
      <Modal
        className="modal-sm"
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onCloseClick}>
        <div className="modal-content modal-content--hollow">
          <div className="modal-body">
            <PreviewCoupon/>

            <button type="button" className="btn btn-primary" onClick={this.props.onRestoreClick}>
              Close Preview
            </button>
          </div>
        </div>
      </Modal>
    );
  }
};

export default PreviewCouponModal;