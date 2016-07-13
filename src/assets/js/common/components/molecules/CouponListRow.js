import React, { Component } from 'react';
import CouponListThumbnail from './CouponListThumbnail';
import Constants from 'app/common/Constants';

class CouponListRow extends Component {
  render() {
    const { coupon } = this.props;

    return (
      <li className="coupon-list__row faux-table__row">
        <div className="faux-table__cell col-xs-2">
          <CouponListThumbnail onClick={this.props.onThumbnailClick}/>
        </div>
        <div className="faux-table__cell col-xs-2">{coupon.brand}</div>
        <div className="faux-table__cell col-xs-2">{coupon.title}</div>
        <div className="faux-table__cell col-xs-2">NI - NI</div>
        <div className="faux-table__cell col-xs-2">{coupon.code}</div>
        <div className="faux-table__cell col-xs-2">
          <button
            type="button"
            className="btn btn-secondary-hollow"
            onClick={this.props.onDeleteClick}>
            <i className="icons8-trash"/>
          </button>
        </div>
      </li>
    );
  }
};

export default CouponListRow;