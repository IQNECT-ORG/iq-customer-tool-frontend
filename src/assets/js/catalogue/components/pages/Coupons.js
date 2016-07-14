import React from 'react';
import DefaultLayout from 'app/common/components/layouts/Default';
import Titlebar from 'app/common/components/layout/titlebars/Factory';
import CouponListContainer from '../../containers/moleculesCouponListContainer';

const Coupons = (props) => {
  return (
    <DefaultLayout
      titleRender={_ => {
        return (
          <Titlebar
            title="Manage / Coupons"
            ctas={[(
              <button
                className="btn btn-secondary btn-radius-lg btn-block"
                type="button"
                onClick={() => {}}>
                Add New Coupon
              </button>
            )]}/>
        );
      }}>
      <div className="container container--gutter">
        <CouponListContainer/>
      </div>
    </DefaultLayout>
  );
};
Coupons.displayName = 'CatalogueCouponsPage';
Coupons.propTypes = {

};

export default Coupons;