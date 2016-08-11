import React, { PropTypes } from 'react';

const BrandDetails = props => {
  console.log(props);
  return (
    <div className="brand-details">
      <ul>
        {_.map(props.brand, (value, key) => {
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
BrandDetails.displayName = 'BrandDetails';
BrandDetails.propTypes = {

};

export default BrandDetails;