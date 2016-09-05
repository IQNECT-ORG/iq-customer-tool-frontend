import React, { Component } from 'react';
import _ from 'lodash';
import joid from 'joid';
import ReactDOM from 'react-dom';
import { Combobox } from 'react-input-enhancements';
import DateTimeField from 'react-bootstrap-datetimepicker';
import AssetField from 'app/common/components/molecules/AssetField';
import classNames from 'classnames';
import TargetType from '../../containers/molecules/TargetTypeContainer';
import TagsInput from '../molecules/TagsInput';
import Submit from 'app/common/components/atoms/Submit';

class CreateCampaign extends Component {
  render() {
    const fields = this.props.fields;
    return (
      <form className="form--content" onSubmit={this.props.handleSubmit}>
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-6 equal-height-container">
            <div className="pane pane--filled media-pane equal-height-item flex m-b-g">
              {this._renderMedia()}
            </div>
          </div>

          <div className="col-xs-12 col-sm-12 col-md-6">
            <div className="pane pane--filled m-b-g">
              <div className="pane__body">
                <div className="row">
                  <div className="col-xs-12">
                    <h2>Campaign Details</h2>

                    <fieldset className={classNames('form-group', {
                      'has-danger': fields.name.error
                    })}>
                      <label htmlFor={joid.link(true, 'input')}>Campaign Title</label>
                      <input type="text" className="form-control" id={joid.link(false, 'input')} placeholder="Demo Name" {...fields.name}/>
                    </fieldset>

                    <TargetType
                      values={{
                        url: this.props.values.url,
                        couponId: this.props.values.couponId
                      }}
                      fields={{
                        url: fields.url,
                        couponId: fields.couponId
                      }}
                      onAddWebsiteClick={this.props.onAddWebsiteClick}
                      onAddCouponClick={this.props.onAddCouponClick}
                      onWebsiteDeleteClick={this.props.onWebsiteDeleteClick}/>

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

  _renderMedia() {
    return (
      <AssetField
        value={this.props.values.media}
        label={'Drag & Drop or click here to upload your video'}
        onChange={ e => {
          this.props.fields.media.onChange(e);
        }}/>
    );
  }
};

export default CreateCampaign;