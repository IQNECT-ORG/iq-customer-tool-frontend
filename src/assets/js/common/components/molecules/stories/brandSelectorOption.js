import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import BrandSelectorOption from '../BrandSelectorOption';

storiesOf('Molecule / Brand Selector Option', module)
  .add('Image w/o ctas', () => (
    <BrandSelectorOption brand={{
      imgPreview: 'http://placehold.it/350x150'
    }}/>
  ))
  .add('Text w/o ctas', () => (
    <BrandSelectorOption brand={{
      name: 'McDonalds'
    }}/>
  ))
  .add('Image w/ ctas', () => (
    <BrandSelectorOption showCTAs={true} brand={{
      imgPreview: 'http://placehold.it/350x150'
    }}/>
  ))
  .add('Text w/ ctas', () => (
    <BrandSelectorOption showCTAs={true} brand={{
      name: 'McDonalds'
    }}/>
  ));