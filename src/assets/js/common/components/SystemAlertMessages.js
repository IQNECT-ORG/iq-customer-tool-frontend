import React, { Component } from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import Expire from './Expire';

export default (props) => {
  const index = _.findIndex(props.messages, x => x.read === false);

  if(index === -1) {
    return null;
  }

  const alert = props.messages[index];

  const className = classNames('alert', `alert-${alert.level}`);
  return (
    <Expire
      delay={4000}
      onExpire={ _ => props.onExpire(index) }>
      <div
        className={className}
        role="alert"
        data-alert-name={alert.name}>
        {alert.message}
      </div>
    </Expire>
  );
};