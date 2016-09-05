import React from 'react';
import DefaultLayout from 'app/common/components/templates/Default';
import Titlebar from 'app/common/components/molecules/TitlebarFactory';
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
                onClick={props.onAddBrandClick}>
                Add New Brand
              </button>
            )]}/>
        );
      }}>
      <div className="container container--gutter">
        <BrandSelectorContainer showCTAs={true}/>
      </div>
    </DefaultLayout>
  );
};

export default Brands;