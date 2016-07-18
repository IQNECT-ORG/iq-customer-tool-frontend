import React from 'react';
import Modal from 'app/modal/components/Modal';
import CouponBrowserContainer from '../../containers/organisms/CouponBrowserContainer';
import { ModalSizes } from '../../Constants';

const CouponBrowser = (props) => {
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
          <h1>Coupon Browser</h1>
        </div>

        <div className="modal-body">
          <CouponBrowserContainer
            form={props.data.form}
            field={props.data.field}/>
        </div>
      </div>
    </Modal>
  );
};

export default CouponBrowser;