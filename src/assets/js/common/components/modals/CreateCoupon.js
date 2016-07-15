import React from 'react';
import Modal from 'app/modal/components/Modal';
import CouponForm from 'app/common/containers/CouponFormContanier';
import { ModalSizes } from '../../Constants';

const CreateCoupon = (props) => {
  return (
    <Modal
      size={ModalSizes.SMALL}
      isOpen={props.isOpen}
      onRequestClose={props.onCloseClick}>
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" aria-label="Close" onClick={props.onCloseClick}>
            <span aria-hidden="true">&times;</span>
          </button>
          <h1>Add New Coupon</h1>
        </div>

        <div className="modal-body">
          <CouponForm onFormSubmit={props.onSubmit} onPreviewClick={props.onPreviewClick}/>
        </div>
      </div>
    </Modal>
  );
};

export default CreateCoupon;