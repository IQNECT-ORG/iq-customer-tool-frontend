import React, { Component } from 'react';
import _ from 'lodash';
import ModalManager from 'app/modal/containers/ModalManager';
// Modals
import AddWebsiteModal from 'app/campaigns/modals/AddWebsite';
import AddCouponModal from 'app/common/modals/AddCoupon';
import CreateCouponModal from 'app/common/modals/CreateCoupon';
import PreviewWebsiteModal from 'app/common/modals/PreviewWebsite';
import PreviewCouponModal from 'app/common/modals/PreviewCoupon';
import SuccessModal from 'app/common/modals/Success';
import AddBrandModal from 'app/common/modals/AddBrand';
import EditBrandModal from 'app/common/modals/EditBrand';
import EditCouponModal from 'app/common/modals/EditCoupon';
import CampaignCouponBrowserModal from 'app/campaigns/modals/CouponBrowser';

class App extends Component {
  render() {
    return (
      <div className="app">
        {this.props.children}
        <ModalManager paths={{
          addWebsite: AddWebsiteModal,
          addCoupon: AddCouponModal,
          previewWebsite: PreviewWebsiteModal,
          createCoupon: CreateCouponModal,
          previewCoupon: PreviewCouponModal,
          success: SuccessModal,
          addBrand: AddBrandModal,
          editBrand: EditBrandModal,
          editCoupon: EditCouponModal,
          campaignCouponBrowser: CampaignCouponBrowserModal
        }}/>
      </div>
    );
  }
};

export default App;