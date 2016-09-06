import React, { Component } from 'react';

class CouponListThumbnail extends Component {
  render() {
    return (
      <button className="coupon-list__thumbnail" type="button" onClick={this.props.onClick}>
        <img className src={this.props.src} />
      </button>
    );
  }
};

export default CouponListThumbnail;