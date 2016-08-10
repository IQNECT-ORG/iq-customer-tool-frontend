import React, { Component } from 'react';
import _ from 'lodash';
import ModalManager from 'app/modal/containers/ModalManager';
import { ModalPaths } from 'app/common/Constants';
// Modals
import AddWebsiteModal from 'app/common/components/modals/AddWebsite';
import AddCouponModal from 'app/common/containers/modals/AddCouponContainer';
import CreateCouponModal from 'app/common/components/modals/CreateCoupon';
import PreviewWebsiteModal from 'app/common/components/modals/PreviewWebsite';
import PreviewCouponModal from 'app/common/components/modals/PreviewCoupon';
import SuccessModal from 'app/common/containers/modals/SuccessContainer';
import AddBrandModal from 'app/common/components/modals/AddBrand';
import EditBrandModal from 'app/common/components/modals/EditBrand';
import EditCouponModal from 'app/common/components/modals/EditCoupon';
import CouponBrowserModal from 'app/common/components/modals/CouponBrowser';

class App extends Component {
  render() {
    return (
      <div className="app">
        {this.props.children}
        <ModalManager paths={{
          // Website
          [ModalPaths.WEBSITE_ADD]: AddWebsiteModal,
          [ModalPaths.WEBSITE_PREVIEW]: PreviewWebsiteModal,
          // Coupon
          [ModalPaths.COUPON_ADD]: AddCouponModal,
          [ModalPaths.COUPON_CREATE]: CreateCouponModal,
          [ModalPaths.COUPON_PREVIEW]: PreviewCouponModal,
          [ModalPaths.COUPON_EDIT]: EditCouponModal,
          [ModalPaths.COUPON_BROWSER]: CouponBrowserModal,
          // Brand
          [ModalPaths.BRAND_CREATE]: AddBrandModal,
          [ModalPaths.BRAND_EDIT]: EditBrandModal,
          // Misc
          [ModalPaths.SUCCESS]: SuccessModal
        }}/>
      </div>
    );
  }
};

export default App;