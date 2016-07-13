import React, { Component } from 'react';
import Coupon from '../coupon/Coupon';
import _ from 'lodash';
import CouponBrowserFilterFormContainer from '../../containers/CouponListFilterFormContainer';

class CouponBrowser extends Component {
  render() {
    return (
      <div className="coupon-browser m-t-1">
        <CouponBrowserFilterFormContainer
          placeholder="Search Coupons"
          onFormSubmit={this.props.onFilterSubmit}/>

        <ul className="list-unstyled row">
          {this._renderRows()}
        </ul>
      </div>
    );
  }
  _renderRows() {
    return _.map(this.props.coupons, ::this._renderRow);
  }

  _renderRow(coupon, index) {
    return (
      <li className="col-xs-12" key={index}>
        <button type="button" onClick={ e => this.props.onCouponClick(e, coupon, index) }>
          <Coupon coupon={coupon}/>
        </button>
      </li>
    );
  }
};

export default CouponBrowser;