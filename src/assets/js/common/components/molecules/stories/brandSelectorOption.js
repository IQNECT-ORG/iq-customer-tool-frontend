import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import BrandSelectorOption from '../BrandSelectorOption';

storiesOf('Molecule / Brand Selector Option', module)
  .add('Image', () => (
    <BrandSelectorOption brand={{
      imgPreview: 'http://placehold.it/350x150'
    }}/>
  ))
  .add('Text', () => (
    <BrandSelectorOption brand={{
      name: 'McDonalds'
    }}/>
  ));