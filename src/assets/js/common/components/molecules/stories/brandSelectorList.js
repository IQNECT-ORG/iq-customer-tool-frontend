import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import BrandSelectorList from '../BrandSelectorList';

storiesOf('Molecule / Brand Selector List', module)
  .addDecorator(story => {
    return (
      <div className="container-fluid">
        {story()}
      </div>
    );
  })
  .add('One brand', () => (
    <BrandSelectorList brands={[{
      imgPreview: 'http://placehold.it/350x150'
    }]}/>
  ))
  .add('Multiple brands', () => (
    <BrandSelectorList brands={[
      {
        imgPreview: 'http://placehold.it/350x150'
      },
      {
        imgPreview: 'http://placehold.it/350x150'
      },
      {
        imgPreview: 'http://placehold.it/350x150'
      },
      {
        imgPreview: 'http://placehold.it/350x150'
      }
    ]}/>
  ))
  .add('No brands', () => (
    <BrandSelectorList brands={[]}/>
  ));