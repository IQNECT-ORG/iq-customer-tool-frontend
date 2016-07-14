import React, { PropTypes } from 'react';

const ModalManager = (props) => {
  const Modal = props.paths[props.path];

  if(Modal == null) {
    return null;
  }

  return (
    <Modal
      isOpen={props.isOpen}
      data={props.data}
      onCloseClick={props.onCloseClick}
      onRestoreClick={props.onRestoreClick}/>
  );
};
ModalManager.displayName = 'ModalManager';
ModalManager.propTypes = {

};

export default ModalManager;