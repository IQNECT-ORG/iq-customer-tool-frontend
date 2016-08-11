import React from 'react';
import DefaultLayout from 'app/common/components/templates/Default';
import Titlebar from 'app/common/components/molecules/TitlebarFactory';
import CouponDetails from 'app/common/containers/organisms/CouponDetailsContainer';

const Coupon = (props) => {
  return (
    <DefaultLayout
      titleRender={_ => {
        return (
          <Titlebar
            title="Manage / Coupons"/>
        );
      }}>
      <div className="container container--gutter">
        <CouponDetails couponId={props.routeParams.couponId}/>
      </div>
    </DefaultLayout>
  );
};

export default Coupon;