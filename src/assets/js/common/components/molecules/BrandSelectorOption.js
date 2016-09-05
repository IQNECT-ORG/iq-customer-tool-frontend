import React, { PropTypes } from 'react';
import BrandThumbnail from '../atoms/BrandThumbnail';

function renderSecondary(props) {
  if(props.showCTAs === true) {
    return (
      <div className="selector__option__secondary">
        <div className="row">
          <div className="col-xs-6">
            <button title="View" className="btn btn-block btn-hollow" type="button" onClick={props.onViewClick}>
              <i className="icons8-visible"/>
            </button>
          </div>
          <div className="col-xs-6">
            <button title="Edit" className="btn btn-block btn-hollow" type="button" onClick={props.onEditClick}>
              <i className="icons8-settings"/>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const BrandSelectorOption = props => {
  return (
    <div className="selector__option">
      <div className="selector__option__primary">
        <button type="button" onClick={props.onOptionClick} style={{
          overflow: 'hidden'
        }}>
          <BrandThumbnail brand={props.brand}/>
        </button>
      </div>
      {renderSecondary(props)}
    </div>
  );
};
BrandSelectorOption.displayName = 'BrandSelectorOption';
BrandSelectorOption.propTypes = {
  // Data
  brand: PropTypes.object.isRequired,
  // Flags
  showCTAs: PropTypes.bool,
  // Events
  onOptionClick: PropTypes.func.isRequired,
  onViewClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired
};
BrandSelectorOption.defaultProps = {
  showCTAs: false
};

export default BrandSelectorOption;