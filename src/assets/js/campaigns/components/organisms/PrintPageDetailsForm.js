import React, { Component } from 'react';
import _ from 'lodash';
import joid from 'joid';
import TagsInput from 'react-tagsinput';
import classNames from 'classnames';
import Submit from 'app/common/components/atoms/Submit';

class PageDetailForm extends Component {
  render() {
    const fields = this.props.fields.pages[this.props.page];

    /*
    <button
      type="button"
      className="btn btn-secondary-outline m-l-1"
      onClick={this.props.onSwitchViewClick}>
      <i className="icons8-activity-grid-2"/>
    </button>
    */

    let warning;
    if(this.props.isTrained === false) {
      warning = (
        <div className="alert alert-warning" role="alert">
          <strong>Warning!</strong>
          <span> This page could not be trained.</span>
        </div>
      );
    }

    return (
      <form className="form--content" onSubmit={this.props.handleSubmit}>
        <div className="row">
          <div className="col-xs-12 col-sm-6">
            {warning}
            <div className="pane pane--filled m-b-g">
              <img className="img-fluid" src={this.props.imageSrc}/>
            </div>
          </div>

          <div className="col-xs-12 col-sm-6">
            <div className="pane pane--filled m-b-g">
              <div className="pane__body">
                <div className="row">
                  <div className="col-xs-12">
                    <div className="pull-xs-right">
                      <button
                        type="button"
                        className="btn btn-secondary-outline m-l-1"
                        disabled={!this.props.hasPrev}
                        onClick={this.props.onPrevPageClick}>
                        <i className="icons8-left"/>
                      </button>

                      <button
                        type="button"
                        className="btn btn-secondary-outline m-l-1"
                        disabled={!this.props.hasNext}
                        onClick={this.props.onNextPageClick}>
                        <i className="icons8-right"/>
                      </button>
                    </div>
                    <h2 className="m-b-3">Page {this.props.page + 1}</h2>
                    <hr/>

                    {this._renderTargetType()}

                    <hr className="m-y-2"/>

                    <div className="row">
                      <div className="col-xs-6">
                        <button type="button" className="btn btn-block btn-secondary btn-radius-lg" onClick={this.props.onBackClick}>Back</button>
                      </div>

                      <div className="col-xs-6">
                        <Submit
                          className="btn btn-block btn-primary btn-radius-lg"
                          isLoading={this.props.submitting}>
                          Summary
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

  _renderTargetType() {
    if(this.props.values.pages[this.props.page].url == null) {
      return (
        <fieldset className="form-group">
          <label>Target Type</label>
          <div className="row">
            <div className="col-xs-6">
              <button
                type="button"
                className="btn btn-block btn-secondary-outline btn-decision"
                onClick={this.props.onAddWebsiteClick}>
                  Add Website
              </button>
            </div>

            <div className="col-xs-6">
              <button
                type="button"
                className="btn btn-block btn-secondary-outline btn-decision"
                onClick={this.props.onAddCouponClick}>
                Add Coupon
              </button>
            </div>
          </div>
        </fieldset>
      );
    }

    return (
      <fieldset className="form-group">
        <label htmlFor={joid.link(true, 'input')}>Target Type</label>
        <div className="input-group">
          <input
            type="url"
            className="form-control"
            id={joid.link(false, 'input')}
            placeholder="Website"
            readOnly
            {...this.props.fields.pages[this.props.page].url}
            onClick={this.props.onAddWebsiteClick}/>
          <span className="input-group-btn">
            <button className="btn btn-secondary" type="button" onClick={this.props.onWebsiteDeleteClick}>
              <i className="icons8-trash"/>
            </button>
          </span>
        </div>
      </fieldset>
    );
  }
};

export default PageDetailForm;