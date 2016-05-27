import React from 'react';
import _ from 'lodash';

const render = (props) => {
  return (
    <div>
      <ul className="row">
        {_.map(props.triggers, (trigger, index) => {
          return (
            <li className="col-xs-3">
              <button type="button" onClick={ () => { props.onTriggerClick(trigger, index) } }>
                <img src={trigger.imgPreview}/>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default render;