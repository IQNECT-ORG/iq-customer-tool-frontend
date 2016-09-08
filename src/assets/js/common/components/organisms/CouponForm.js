import React, { Component } from 'react';
import DateTimeField from 'react-bootstrap-datetimepicker';
import joid from 'joid';
import AssetField from '../molecules/AssetField';
import Submit from 'app/common/components/atoms/Submit';

class CouponForm extends Component {
  render() {
    const fields = this.props.fields;
    return (
      <form className="form--modal" onSubmit={this.props.handleSubmit}>
        <fieldset className="form-group">
          <div className="row">
            <div className="col-xs-6 aspect-1-1-container">
              <div className="aspect-item">
                <AssetField
                  onChange={fields.artwork.onChange}
                  value={fields.artwork.value}/>
              </div>
            </div>
          </div>
        </fieldset>

        <fieldset className="form-group">
          <label htmlFor={joid.link(true, 'input')}>Name</label>
          <input
            type="text"
            className="form-control"
            id={joid.link(false, 'input')}
            placeholder="Buy 1 Get 1 Free (1 For 1)"
            {...fields.couponName}/>
        </fieldset>

        <fieldset className="form-group">
          <label htmlFor={joid.link(true, 'input')}>Discount Code</label>
          <input
            type="text"
            className="form-control"
            id={joid.link(false, 'input')}
            placeholder="B1G1F"
            {...fields.discountCode}/>
        </fieldset>

        <fieldset className="form-group">
          <label htmlFor={joid.link(true, 'input')}>Url</label>
          <input
            type="url"
            className="form-control"
            id={joid.link(false, 'input')}
            placeholder="B1G1F"
            {...fields.url}/>
        </fieldset>

        <div className="row">
          <div className="col-xs-6 offset-xs-6">
            <Submit
              className="btn btn-block btn-primary btn-radius-lg"
              isLoading={this.props.submitting}>
              Save
            </Submit>
          </div>
        </div>
      </form>
    );
  }
};

export default CouponForm;