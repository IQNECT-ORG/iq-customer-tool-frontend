import React from 'react';
import _ from 'lodash';

const HeadedMetric = (props) => {
  return (
    <div className="metric" style={{
      color: props.colorScheme
    }}>
      <span className="metric__label">{props.label}</span>
      <span className="metric__value">{props.value} </span>
    </div>
  );
};

export default HeadedMetric;