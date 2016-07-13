import React from 'react';
import ImageThumbnail from './ImageThumbnail';
import TextThumbnail from './TextThumbnail';

export default (props) => {
  if(props.brand.imgPreview) {
    return (
      <ImageThumbnail src={props.brand.imgPreview}/>
    );
  }

  return (
    <TextThumbnail label={props.brand.name}/>
  );
};