import React from 'react';
import Modal from 'app/modal/components/Modal';
import AddBrandFormContainer from '../../containers/organisms/AddBrandFormContainer';
import { ModalSizes } from '../../Constants';

const AddBrand = (props) => {
  return (
    <Modal
      size={ModalSizes.MEDIUM}
      isOpen={props.isOpen}
      onRequestClose={props.onCloseClick}>
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" aria-label="Close" onClick={props.onCloseClick}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div className="modal-body">
          <AddBrandFormContainer/>
        </div>
      </div>
    </Modal>
  );
};

export default AddBrand;