import React from 'react';
import joid from 'joid';
import { DatePicker } from 'react-input-enhancements';
import moment from 'moment';

const render = (props) => {
  const { fields } = props;

  return (
    <div className="row">
      <div className="col-xs-3">
        <ul className="list-unstyled">
          <li className="m-b-1">
            <button className="btn btn-secondary btn-block" type="button" onClick={ () => props.onDatePresetClick('today') }>
              Today
            </button>
          </li>
          <li className="m-b-1">
            <button className="btn btn-secondary btn-block" type="button" onClick={ () => props.onDatePresetClick('thisWeek') }>
              This Week
            </button>
          </li>
          <li>
            <button className="btn btn-secondary btn-block" type="button" onClick={ () => props.onDatePresetClick('thisMonth') }>
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
                <DatePicker
                  onChange={fields.periodStart.onChange}
                  value={moment(fields.periodStart.value).format('ddd DD/MM/YYYY')}>
                  { inputProps => {
                    return (
                      <input
                        type="text"
                        {...inputProps}
                        pattern={null}
                        className={`${inputProps.className} form-control`}/>
                    );
                  }}
                </DatePicker>
              </div>
            </fieldset>
          </div>
          <div className="col-xs-12 col-sm-6">
            <fieldset className="form-group">
              <label className="sr-only" htmlFor={joid.link(true, 'input')}>From</label>
              <div className="input-group">
                <DatePicker
                  onChange={fields.periodEnd.onChange}
                  value={moment(fields.periodEnd.value).format('ddd DD/MM/YYYY')}>
                  { inputProps => {
                    return (
                      <input
                        type="text"
                        {...inputProps}
                        pattern={null}
                        className={`${inputProps.className} form-control`}/>
                    );
                  }}
                </DatePicker>
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
};

export default render;