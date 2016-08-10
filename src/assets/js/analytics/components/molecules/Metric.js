import React from 'react';
import _ from 'lodash';

const Metric = (props) => {
  return (
    <div className="metric" style={{
      color: props.colorScheme
    }}>
      <span className="metric__value">{props.value} </span>
      <span className="metric__label">{props.label}</span>
    </div>
  );
};

export default Metric;