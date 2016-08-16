import React from 'react';
import _ from 'lodash';

const render = (props) => {
  return (
    <div>
      <ul className="row">
        {_.map(props.images, (image, index) => {
          return (
            <li className="col-xs-3">
              <button type="button" onClick={ () => { props.onImageClick(image, index) } }>
                <img/>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default render;