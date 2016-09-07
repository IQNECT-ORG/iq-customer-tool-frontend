import React from 'react';
import classNames from 'classnames';
import DotsSpinner from './DotsSpinner';

export default function(props) {
  const buttonProps = {
    className: classNames(props.className),
    type: 'submit'
  };

  if(props.isLoading === true) {
    buttonProps.children = (
      <DotsSpinner className="spinner--primary"/>
    );
    buttonProps.disabled = true;
  } else {
    buttonProps.children = props.children;
  }

  return (
    <button {...buttonProps}>
      {buttonProps.children}
    </button>
  );
};