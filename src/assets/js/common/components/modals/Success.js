import React from 'react';
import Modal from 'app/modal/components/Modal';

const Success = (props) => {
  return (
    <Modal
      size='xs'
      isOpen={props.isOpen}
      onRequestClose={props.onCloseClick}>
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" aria-label="Close" onClick={props.onCloseClick}>
            <span aria-hidden="true">&times;</span>
          </button>
          <h1>Success!</h1>
        </div>

        <div className="modal-body">
          <button
            type="button"
            className="btn btn-primary"
            onClick={props.onLeaveClick}>
            Go to Dashboard
          </button>
        </div>
      </div>
    </Modal>
  );

};
Success.displayName = 'Success';
Success.propTypes = {

};

export default Success;