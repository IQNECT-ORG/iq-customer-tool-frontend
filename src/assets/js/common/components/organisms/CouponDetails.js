import React, { PropTypes } from 'react';

const CouponDetails = props => {
  return (
    <div className="coupon-details">
      <ul>
        {_.map(props.coupon, (value, key) => {
          return (
            <li key={key}>
              {key}: {value}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
CouponDetails.displayName = 'CouponDetails';
CouponDetails.propTypes = {

};

export default CouponDetails;