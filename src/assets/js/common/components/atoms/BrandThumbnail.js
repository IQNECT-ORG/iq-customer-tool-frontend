import React, { PropTypes } from 'react';
import ImageThumbnail from './ImageThumbnail';
import TextThumbnail from './TextThumbnail';

const BrandThumbnail = props => {
  if(props.brand.imgPreview) {
    return (
      <ImageThumbnail className="img-fluid m-x-auto" src={props.brand.imgPreview}/>
    );
  }

  return (
    <TextThumbnail label={props.brand.name}/>
  );
};
BrandThumbnail.displayName = 'BrandThumbnail';
BrandThumbnail.propTypes = {
  brand: PropTypes.shape({
    imgPreview: PropTypes.string,
    text: PropTypes.string
  }).isRequired
};
BrandThumbnail.defaultProps = {

};

export default BrandThumbnail;