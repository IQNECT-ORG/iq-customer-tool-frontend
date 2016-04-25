import React, { Component } from 'react';
import _ from 'lodash';
import joid from 'joid';
import ReactDOM from 'react-dom';
import { Combobox } from 'react-input-enhancements';
import DateTimeField from 'react-bootstrap-datetimepicker';
import AssetField from 'app/common/components/forms/AssetField';
import classNames from 'classnames';
import TargetType from '../../TargetType';
import TagsInput from '../../TagsInput';

class CampaignForm extends Component {
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
                    <h2>Campaign Details</h2>

                    <fieldset className={classNames('form-group', {
                      'has-danger': fields.campaignTitle.error
                    })}>
                      <label htmlFor={joid.link(true, 'input')}>Campaign Title</label>
                      <input type="text" className="form-control" id={joid.link(false, 'input')} placeholder="Demo Name" {...fields.campaignTitle}/>
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

                    <TargetType
                      values={{
                        website: this.props.values.website,
                        coupon: this.props.values.coupon
                      }}
                      fields={{
                        website: fields.website,
                        coupon: fields.coupon
                      }}
                      onAddWebsiteClick={this.props.onAddWebsiteClick}
                      onAddCouponClick={this.props.onAddCouponClick}
                      onWebsiteDeleteClick={this.props.onWebsiteDeleteClick}/>

                    <TagsInput
                      value={this.props.values.tags}
                      onChange={this.props.onTagsChange}/>

                    <hr/>

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

export default CampaignForm;