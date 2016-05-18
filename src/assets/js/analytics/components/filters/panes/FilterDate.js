import React, { Component } from 'react';
import DateTimeField from 'react-bootstrap-datetimepicker';
import joid from 'joid';

const render = (props) => {
  const { fields } = props;

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
        <div className="row">
          <div className="col-xs-12">
            <label htmlFor={joid.link(true, 'input')}>Custom</label>
          </div>
          <div className="col-xs-12 col-sm-6">
            <fieldset className="form-group">
              <div className="input-group">
                <DateTimeField
                  mode="date"
                  id={joid.link(false, 'input')}
                  placeholder="From"
                  {...fields.dateStart}
                  buttonIcon="icons8-date-from"/>
              </div>
            </fieldset>
          </div>
          <div className="col-xs-12 col-sm-6">
            <fieldset className="form-group">
              <label className="sr-only" htmlFor={joid.link(true, 'input')}>From</label>
              <div className="input-group">
                <DateTimeField
                  mode="date"
                  id={joid.link(false, 'input')}
                  placeholder="To"
                  {...fields.dateEnd}
                  buttonIcon="icons8-date-to"/>
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
};

export default render;