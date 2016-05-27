import React from 'react';
import _ from 'lodash';

const render = (props) => {
  return (
    <div>
      <ul className="row">
        {_.map(props.frames, (frame, index) => {
          return (
            <li className="col-xs-3">
              <button type="button" onClick={ () => { props.onFrameClick(frame, index) } }>
                <img src={frame.images.default}/>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default render;