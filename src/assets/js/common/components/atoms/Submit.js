import React from 'react';
import classNames from 'classnames';
import DotsSpinner from './DotsSpinner';

export default function(props) {
  const className = classNames(props.className);

  let content;
  if(props.isLoading === true) {
    content = (
      <DotsSpinner className="spinner--primary"/>
    );
  } else {
    content = props.children;
  }

  return (
    <button type="submit" className={className}>
      {content}
    </button>
  );
};