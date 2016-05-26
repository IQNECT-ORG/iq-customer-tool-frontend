import React from 'react';
import _ from 'lodash';

const render = (props) => {
  return (
    <div>
      <ul className="row">
        {_.map(props.triggers, trigger => {
          return (
            <li className="col-xs-3">
              Trigger
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default render;