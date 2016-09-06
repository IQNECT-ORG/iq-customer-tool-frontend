import React, { Component } from 'react';
import CouponListThumbnail from '../atoms/CouponListThumbnail';
import Constants from 'app/common/Constants';

class CouponListRow extends Component {
  render() {
    const { coupon } = this.props;
    const props = this.props;

    return (
      <li className="coupon-list__row faux-table__row">
        <div className="faux-table__cell col-xs-3">
          <CouponListThumbnail onClick={this.props.onThumbnailClick}/>
        </div>
        <div className="faux-table__cell col-xs-3">{coupon.title}</div>
        <div className="faux-table__cell col-xs-3">{coupon.subtitle}</div>
        <div className="faux-table__cell col-xs-3">
          <button
            type="button"
            className="btn btn-secondary-hollow"
            onClick={props.onViewClick}>
            <i className="icons8-visible"/>
          </button>

          <button
            type="button"
            className="btn btn-secondary-hollow"
            onClick={props.onDeleteClick}>
            <i className="icons8-trash"/>
          </button>

          <button
            type="button"
            className="btn btn-secondary-hollow"
            onClick={props.onEditClick}>
            <i className="icons8-settings"/>
          </button>
        </div>
      </li>
    );
  }
};

export default CouponListRow;