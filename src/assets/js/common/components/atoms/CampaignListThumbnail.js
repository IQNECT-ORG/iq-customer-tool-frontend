import React, { Component } from 'react';

export default (props) => {
  return (
    <button className="campaign-list__thumbnail" type="button" onClick={props.onClick}>
      <img className src={props.src} />
    </button>
  );
};