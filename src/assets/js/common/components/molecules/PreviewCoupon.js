import React, { Component } from 'react';

class PreviewCoupon extends Component {
  render() {
    return (
      <div className="preview-coupon">
        <div className="card coupon">
          <img className="card-img-top img-fluid" src="http://placehold.it/350x150" alt="Card image cap"/>
          <div className="card-block">
            <h1 className="card-title coupon__brand">AQUATCH</h1>
            <span className="card-text coupon__title">Buy 1 Get 1 Free</span>
            <span className="card-text coupon_expiry">VALID UNTIL <time>29/04/16</time></span>
          </div>
        </div>
      </div>
    );
  }
};

export default PreviewCoupon;