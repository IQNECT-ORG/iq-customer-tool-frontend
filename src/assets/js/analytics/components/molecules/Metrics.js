import React from 'react';
import _ from 'lodash';

const Metrics = (props) => {
  return (
    <div className="metrics">
      {_.map(props.metrics, (metric, index) => {
        return React.createElement(
          props.component,
          {
            key: index,
            colorScheme: props.colorScheme[index],
            value: metric.value,
            label: metric.label
          }
        );
      })}
    </div>
  );
};

export default Metrics;