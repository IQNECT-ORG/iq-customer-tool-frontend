import React, { Component } from 'react';
import _ from 'lodash';
import joid from 'joid';
import ReactDOM from 'react-dom';
import { Combobox } from 'react-input-enhancements';
import DateTimeField from 'react-bootstrap-datetimepicker';
import AssetField from 'app/common/components/forms/AssetField';
import classNames from 'classnames';

class BasicDetailsForm extends Component {
  render() {
    const fields = this.props.fields;
    
    return (
      <form className="form--content" onSubmit={this.props.onSubmit}>
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-6 equal-height-container">
            <div className="pane pane--filled media-pane equal-height-item flex">
              {this._renderMedia()}
            </div>
          </div>

          <div className="col-xs-12 col-sm-12 col-md-6">
            <div className="pane pane--filled">
              <div className="pane__body">
                <div className="row">
                  <div className="col-xs-12">
                    <h2>Basic Details</h2>

                    <fieldset className={classNames('form-group', {
                      'has-danger': fields.campaignTitle.error
                    })}>
                      <label htmlFor={joid.link(true, 'input')}>Campaign Title</label>
                      <input type="text" className="form-control" id={joid.link(false, 'input')} placeholder="Demo Name" {...fields.campaignTitle}/>
                    </fieldset>

                    <fieldset className="form-group">
                      <label htmlFor={joid.link(true, 'input')}>Magazine Language</label>
                      {this._renderLanguageSelector()}
                    </fieldset>


                    <div className="row">
                      <div className="col-xs-12">
                        <label htmlFor={joid.link(true, 'input')}>Campaign Period</label>
                      </div>
                      <div className="col-xs-12 col-sm-6">
                        <fieldset className="form-group">
                          <div className="input-group">
                            <DateTimeField
                              mode="date"
                              id={joid.link(false, 'input')}
                              placeholder="From"
                              {...fields.campaignPeriodFrom}
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
                              {...fields.campaignPeriodTo}
                              buttonIcon="icons8-date-to"/>
                          </div>
                        </fieldset>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor={joid.link(true, 'input')}>Default Target</label>
                      <div className="input-group">
                        <input type="text" className="form-control" id={joid.link(false, 'input')} placeholder="Default Target" {...fields.defaultTarget}/>
                        <div className="input-group-btn">
                          <button type="button" className="btn btn-block btn-secondary" onClick={this.props.onPreviewWebsiteClick}>
                            <i className="icons8-visible"/>
                          </button>

                        </div>
                      </div>
                    </div>

                    <hr className="m-y-2"/>

                    <div className="row">
                      <div className="col-xs-6">
                        <button type="button" className="btn btn-block btn-secondary btn-radius-lg" onClick={this.props.onBackClick}>Back</button>
                      </div>

                      <div className="col-xs-6">
                        <button type="submit" className="btn btn-block btn-primary btn-radius-lg">Next</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }

  _renderLanguageSelector() {
    const fields = this.props.fields;

    if(fields.campaignId.value) {
      return (
        <input
          id={joid.link(true, 'input')}
          className="form-control"
          type="text"
          placeholder="Language"
          value={fields.magazineLanguage.value}
          readOnly/>
      );
    } else {
      return (
        <Combobox defaultValue={'English'}
          options={['English', 'Korean']}
          dropdownProps={{ style: { width: '100%' } }}
          autocomplete>
          {inputProps =>
            <input {...inputProps}
              id={joid.link(false, 'input')}
              type='text'
              className={`${inputProps.className} form-control`}
              placeholder='English'
              {...fields.magazineLanguage}/>
          }
        </Combobox>
      );
    }
  }

  _renderMedia() {
    const fields = this.props.fields;

    if(fields.campaignId.value) {
      return (
        <div>@TODO</div>
      );
    } else {
      return (
        <AssetField
          onChange={fields.media.onChange}
          value={fields.media.value}/>
      );
    }
  }
};

export default BasicDetailsForm;