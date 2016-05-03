import React, { Component } from 'react';
import { connect } from 'react-redux';
import CouponList from 'app/common/components/couponList/CouponList';
import ui from 'redux-ui/transpiled';
import campaignActions from 'app/common/actions/campaigns';
import { getCoupons } from 'app/core/selectors/entities/coupons';
import _ from 'lodash';
import { push } from 'react-router-redux/lib/actions';

class CouponListContainer extends Component {

  componentDidMount() {
    //this.props.actions.fetchCampaigns();
  }

  render() {
    return (
      <CouponList {...this.props}/>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let filteredCoupons = _.filter(getCoupons(state), campaign => {
    if(ownProps.ui.filter == null) {
      return true;
    }
    return _.includes(_.lowerCase(campaign.name), _.lowerCase(ownProps.ui.filter));
  });

  return {
    coupons: filteredCoupons
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    actions: {
      //fetchCampaigns: () => {
        //dispatch(campaignActions.fetch());
      //}
    },
    onFilterSubmit: (values) => {
      ownProps.updateUI('filter', values.filter);
    },
    onDeleteClick: (campaign) => {
      //dispatch(deleteCampaign(campaign.campaignId));
    },
    onThumbnailClick: (campaign) => {
      //dispatch(push(`/campaigns/edit/${campaign.campaignId}`));
    }
  };
}

let DecoratedComponent = CouponListContainer;
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);
DecoratedComponent = ui({
  key: 'couponList',
  state: {
    filter: null
  }
})(DecoratedComponent);

export default DecoratedComponent;