import React from 'react';
import DefaultLayout from 'app/common/components/layouts/Default';
import Titlebar from 'app/common/components/layout/titlebars/Factory';
import BrandSelectorContainer from '../../containers/molecules/BrandSelectorContainer';

const Brands = (props) => {
  return (
    <DefaultLayout
      titleRender={_ => {
        return (
          <Titlebar
            title="Manage / Brands"
            ctas={[(
              <button
                className="btn btn-secondary btn-radius-lg btn-block"
                type="button"
                onClick={ () => {} }>
                Add New Brand
              </button>
            )]}/>
        );
      }}>
      <div className="container container--gutter">
        <BrandSelectorContainer/>
      </div>
    </DefaultLayout>
  );
};

export default Brands;