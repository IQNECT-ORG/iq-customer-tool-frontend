import React from 'react';
import classNames from 'classnames';

export default function(props) {
  const className = classNames('spinner', props.className);
  return (
    <div className={className}>
      <div className="bounce1"></div>
      <div className="bounce2"></div>
      <div className="bounce3"></div>
    </div>
  );
};