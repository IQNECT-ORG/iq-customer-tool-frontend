import React from 'react';
import Modal from 'app/modal/components/Modal';
import AddWebsiteFormContainer from 'app/common/containers/AddWebsiteFormContainer';
import { ModalSizes } from '../../Constants';

const AddWebsite = (props) => {
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
          <h1>Add Website</h1>
        </div>

        <div className="modal-body">
          <AddWebsiteFormContainer
            referenceForm={props.data.form}
            referenceField={props.data.field}/>
        </div>
      </div>
    </Modal>
  );
};

export default AddWebsite;