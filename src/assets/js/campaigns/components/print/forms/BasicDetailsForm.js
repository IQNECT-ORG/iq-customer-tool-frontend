import React, { Component } from 'react';
import _ from 'lodash';
import joid from 'joid';
import ReactDOM from 'react-dom';
import { Combobox } from 'react-input-enhancements';
import DateTimeField from 'react-bootstrap-datetimepicker';
import AssetField from 'app/common/components/forms/AssetField';
import classNames from 'classnames';
import Submit from 'app/common/components/forms/Submit';

class BasicDetailsForm extends Component {
  render() {
    const fields = this.props.fields;

    return (
      <form className="form--content" onSubmit={this.props.onSubmit}>
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-6">
            <div className="pane pane--filled media-pane flex m-b-g">
              {this._renderMedia()}
            </div>
          </div>

          <div className="col-xs-12 col-sm-12 col-md-6">
            <div className="pane pane--filled m-b-g">
              <div className="pane__body">
                <div className="row">
                  <div className="col-xs-12">
                    <h2 className="m-b-3">Basic Details</h2>

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
                        <Submit
                          className="btn btn-block btn-primary btn-radius-lg"
                          isLoading={this.props.submitting}>
                          Next
                        </Submit>
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
      const magazineInputProps = _.omit(fields.magazineLanguage, ['value', 'onChange']);
      return (
        <Combobox defaultValue={'English'}
          options={['English', 'Korean']}
          dropdownProps={{ style: { width: '100%' } }}
          autocomplete
          value={fields.magazineLanguage.value}
          onValueChange={fields.magazineLanguage.onChange}>
          {inputProps =>
            <input {...inputProps}
              id={joid.link(false, 'input')}
              type='text'
              className={`${inputProps.className} form-control`}
              placeholder='English'
              {...magazineInputProps}/>
          }
        </Combobox>
      );
    }
  }

  _renderMedia() {
    const fields = this.props.fields;

    if(fields.campaignId.value) {
      const frame = _.find(this.props.trainingResults, x => x.frame === 0);
      if(frame == null) {
        return null;
      }

      return (
        <div>
          <img className="img-fluid" src={frame.images.default}/>
        </div>
      );
    } else {
      return (
        <AssetField
          label={'Drag & Drop or click here to upload your magazine'}
          onChange={fields.media.onChange}
          value={fields.media.value}/>
      );
    }
  }
};

export default BasicDetailsForm;