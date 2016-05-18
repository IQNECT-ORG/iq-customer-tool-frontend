import React, { Component } from 'react';

const render = (props) => {
  return (
    <div className="row">
      <div className="col-xs-3">
        <ul>
          <li>
            <button type="button">
              Today
            </button>
          </li>
          <li>
            <button type="button">
              This Week
            </button>
          </li>
          <li>
            <button type="button">
              This Month
            </button>
          </li>
        </ul>
      </div>

      <div className="col-xs-9">
        Custom
      </div>
    </div>
  );
};

export default render;