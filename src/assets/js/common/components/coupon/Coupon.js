import React, { Component } from 'react';

class Coupon extends Component {
  render() {
    const { coupon } = this.props;
    return (
      <div className="coupon">
        <div>
          <img src="http://placehold.it/350x150"/>
        </div>
        <div>
          <div>Brand: {coupon.brand}</div>
          <div>Name: {coupon.title}</div>
          <div>Validity: NI - NI</div>
          <div>Code: NI</div>
        </div>
      </div>
    );
  }
};

export default Coupon;