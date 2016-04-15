import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import _ from 'lodash';
import ModalManager from 'app/modal/containers/ModalManager';

import AddWebsiteModal from 'app/campaigns/modals/AddWebsite';
import AddCouponModal from 'app/campaigns/modals/AddCoupon';
import CreateCouponModal from 'app/campaigns/modals/CreateCoupon';
import PreviewWebsiteModal from 'app/common/modals/PreviewWebsite';
import PreviewCouponModal from 'app/common/modals/PreviewCoupon';

class App extends Component {
  static get contextTypes() {
    return {
      store: React.PropTypes.object
    };
  }

  componentWillMount() {
    this.context.store.dispatch({
      type: 'APP_STARTUP'
    });
  }

  render() {
    return (
      <div>
        {this.props.children}
        <ModalManager paths={{
          addWebsite: AddWebsiteModal,
          addCoupon: AddCouponModal,
          previewWebsite: PreviewWebsiteModal,
          createCoupon: CreateCouponModal,
          previewCoupon: PreviewCouponModal
        }}/>
      </div>
    );
  }
};

export default DragDropContext(HTML5Backend)(App);