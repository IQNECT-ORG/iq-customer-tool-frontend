import React from 'react';
import Modal from 'app/modal/components/Modal';
import AddCouponForm from 'app/common/components/forms/AddCouponForm';
import { ModalSizes } from '../../Constants';

const AddCoupon = (props) => {
  return (
    <Modal
      size={ModalSizes.EXTRA_SMALL}
      isOpen={props.isOpen}
      onRequestClose={props.onCloseClick}>
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" aria-label="Close" onClick={props.onCloseClick}>
            <span aria-hidden="true">&times;</span>
          </button>
          <h1>Add Coupon</h1>
        </div>

        <div className="modal-body">
          <AddCouponForm
            onBrowseClick={props.onBrowseClick}
            onSubmit={props.onSubmit}/>
        </div>
      </div>
    </Modal>
  );
};

export default AddCoupon;