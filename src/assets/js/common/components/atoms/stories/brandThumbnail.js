import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import BrandThumbnail from '../BrandThumbnail';

storiesOf('Atom / Brand Thumbnail', module)
  .add('Image', () => (
    <BrandThumbnail brand={{
      imgPreview: 'http://placehold.it/350x150'
    }}/>
  ))
  .add('Text', () => (
    <BrandThumbnail brand={{
      name: 'McDonalds'
    }}/>
  ));