import React, { Component } from 'react';
import _ from 'lodash';

const render = (props) => {
  return (
    <div>
      {_.map(props.metrics, (metric, index) => {
        return (
          <div key={metric.label} style={{
            color: props.colorScheme[index]
          }}>
            <span>{metric.value} </span>
            <span>{metric.label}</span>
          </div>
        );
      })}
    </div>
  );
};

export default render;