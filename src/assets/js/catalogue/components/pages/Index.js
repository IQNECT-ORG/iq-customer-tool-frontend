import React from 'react';
import DefaultLayout from 'app/common/components/templates/Default';
import Titlebar from 'app/common/components/molecules/TitlebarFactory';

const Index = () => {
  return (
    <DefaultLayout
      titleRender={_ => {
        return (
          <Titlebar title="Manage"/>
        );
      }}>
      <div className="container">
      </div>
    </DefaultLayout>
  );
};
Index.displayName = 'CatalogueIndexPage';
Index.propTypes = {

};

export default Index;