import React from 'react';
import DefaultLayout from 'app/common/components/templates/Default';
import Titlebar from 'app/common/components/molecules/TitlebarFactory';
import BrandDetails from 'app/common/containers/organisms/BrandDetailsContainer';

const Brand = (props) => {
  return (
    <DefaultLayout
      titleRender={_ => {
        return (
          <Titlebar
            title="Manage / Brands"/>
        );
      }}>
      <div className="container container--gutter">
        <BrandDetails brandId={props.routeParams.brandId}/>
      </div>
    </DefaultLayout>
  );
};

export default Brand;