import React, { PropTypes } from 'react';

const render = (props) => {
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
render.displayName = 'ModalManager';
render.propTypes = {

};

export default render;