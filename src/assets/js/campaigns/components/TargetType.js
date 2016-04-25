import React, { Component } from 'react';
import joid from 'joid';

class TargetType extends Component {
  render() {
    if(
      this.props.values.website == null &&
      this.props.values.coupon == null
    ) {
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

    if(this.props.values.website) {
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
              {...this.props.fields.website}
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

    if(this.props.values.coupon) {
      return (
        <div>
          <span>Coupon</span>
          <button type="button" onClick={this.props.onCouponDeleteClick}>
            <i className="icons8-trash"/>
          </button>
        </div>
      );
    }
  }
};

export default TargetType;
