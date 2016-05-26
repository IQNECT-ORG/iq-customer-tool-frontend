import React from 'react';
import _ from 'lodash';

const render = (props) => {
  return (
    <div>
      {_.map(props.metrics, (metric, index) => {
        return (
          <div key={metric.label} style={{
            color: props.colorScheme[index]
          }}>
            <div>{metric.label}</div>
            <div>{metric.value} </div>
          </div>
        );
      })}
    </div>
  );
};

export default render;