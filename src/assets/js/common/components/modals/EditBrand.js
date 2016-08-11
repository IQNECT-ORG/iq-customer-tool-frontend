import React from 'react';
import Modal from 'app/modal/components/Modal';
import EditBrandFormContainer from '../../containers/organisms/EditBrandFormContainer';
import { ModalSizes } from '../../Constants';

const EditBrand = (props) => {
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
          <EditBrandFormContainer
            brandId={props.data.brandId}/>
        </div>
      </div>
    </Modal>
  );
};

export default EditBrand;