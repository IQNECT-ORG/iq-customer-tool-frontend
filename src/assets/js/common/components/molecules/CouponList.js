import React, { Component } from 'react';
import CouponListRow from './CouponListRow';
import _ from 'lodash';
import CouponListFilterFormContainer from '../../containers/molecules/CouponListFilterFormContainer';

class CouponList extends Component {
  render() {
    return (
      <div className="coupon-list m-t-1">
        <div className="pane pane--filled">
          <div className="pane__body">
            <CouponListFilterFormContainer
              placeholder="Search Coupons"
              onFormSubmit={this.props.onFilterSubmit}/>

            <div className="faux-table coupon-list__table">
              <div className="faux-table__head">
                <div className="faux-table__cell col-xs-2">Artwork</div>
                <div className="faux-table__cell col-xs-2">Product Brand</div>
                <div className="faux-table__cell col-xs-2">Name</div>
                <div className="faux-table__cell col-xs-2">Validity</div>
                <div className="faux-table__cell col-xs-2">Code</div>
                <div className="faux-table__cell col-xs-2">&nbsp;</div>
              </div>
              <ul className="faux-table__body list-unstyled">
                {this._renderRows()}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
  _renderRows() {
    return _.map(this.props.coupons, ::this._renderRow);
  }

  _renderRow(coupon, index) {
    return (
      <CouponListRow
        coupon={coupon}
        key={index}
        onThumbnailClick={ _ => { this.props.onThumbnailClick(coupon) }}
        onDeleteClick={ _ => { this.props.onDeleteClick(coupon) }}/>
    );
  }
};

export default CouponList;