import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import _ from 'lodash';
import ModalManager from 'app/modal/containers/ModalManager';

import AddWebsiteModal from 'app/campaigns/print/modals/AddWebsite';
import AddCouponModal from 'app/campaigns/print/modals/AddCoupon';
import CreateCouponModal from 'app/campaigns/print/modals/CreateCoupon';
import PreviewWebsiteModal from 'app/common/modals/PreviewWebsite';

class App extends Component {
  render() {
    return (
      <div>
        {this.props.children}
        <ModalManager paths={{
          addWebsite: AddWebsiteModal,
          addCoupon: AddCouponModal,
          previewWebsite: PreviewWebsiteModal,
          createCoupon: CreateCouponModal
        }}/>
      </div>
    );
  }
};

export default DragDropContext(HTML5Backend)(App);