import React, { Component } from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import Expire from '../Expire';

export default (props) => {
  const index = _.findIndex(props.messages, x => x.read === false);

  if(index === -1) {
    return null;
  }

  const alert = props.messages[index];

  const className = classNames('alert alert-dismissible', `alert-${alert.level}`);
  return (
    <Expire
      delay={10 * 1000}
      onExpire={ _ => props.onExpire(index) }>
      <div
        className={className}
        role="alert"
        data-alert-name={alert.name}>
        <button type="button" className="close" aria-label="Close" onClick={ _ => props.onDismiss(index) }>
          <span aria-hidden="true">&times;</span>
        </button>
        {alert.message}
      </div>
    </Expire>
  );
};