import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import ui from 'redux-ui';
import { updateUI } from 'redux-ui/transpiled/action-reducer';
import {
  campaignLoadCreatePage,
  campaignSelectBrand,
  campaignSelectCampaignType,
  campaignResetCreate
} from '../../signals';
import { modalOpen } from 'app/modal/signals';
import { getUI } from 'app/core/selectors/ui';
import AuthenticationRequiredContainer from 'app/common/containers/hoc/AuthenticationRequiredContainer';
import CreatePage from '../../components/pages/Create';

class CreateContainer extends Component {
  componentDidMount() {
    if(this.props.params.brandId) {
      this.props.actions.selectBrand(this.props.params.brandId);
    }

    if(this.props.params.campaignTypeId) {
      this.props.actions.selectCampaignType(this.props.params.campaignTypeId);
    }

    if(this.props.params.brandId == null && this.props.params.campaignTypeId == null) {
      this.props.actions.campaignResetCreate();
    }

    this.props.actions.load();
    this.props.actions.closeMenu();
  }

  componentWillUpdate(nextProps) {
    if(nextProps.params.brandId && nextProps.params.brandId !== this.props.params.brandId) {
      nextProps.actions.selectBrand(nextProps.params.brandId);
    }

    if(nextProps.params.campaignTypeId && nextProps.params.campaignTypeId !== this.props.params.campaignTypeId) {
      nextProps.actions.selectCampaignType(nextProps.params.campaignTypeId);
    }

    if(nextProps.params.brandId == null && nextProps.params.campaignTypeId == null) {
      if(this.props.selectedBrandId || this.props.selectedCampaignTypeId) {
        nextProps.actions.campaignResetCreate();
      }
    }

  }

  render() {
    return (
      <CreatePage {...this.props}/>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const selectedBrandId = state.campaigns.create.selectedBrandId;
  let selectedBrand;
  if(selectedBrandId) {
    selectedBrand = state.entities.brands[selectedBrandId];
  }

  return {
    steptrackerStep: _.get(getUI(state), 'scene.campaignPrint.step'),
    selectedBrandId,
    selectedBrand,
    selectedCampaignTypeId: state.campaigns.create.selectedCampaignTypeId
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    actions: bindActionCreators({
      load: campaignLoadCreatePage,
      campaignSelectBrand,
      campaignSelectCampaignType,
      campaignResetCreate,
      modalOpen,
      closeMenu: () => { return updateUI(['scene', 'drawNav'], 'isOpen', false) }
    }, dispatch)

    // {
    //   load: () => {
    //     dispatch(loadCampaignCreatePage());
    //   },
    //   closeMenu: _ => {
    //     dispatch();
    //   },
    //   selectBrand: (brandId) => {
    //     dispatch(selectBrand(brandId));
    //   },
    //   selectCampaignType: (campaignTypeId) => {
    //     dispatch(selectCampaignType(campaignTypeId));
    //   },
    //   campaignResetCreate: _ => dispatch(campaignResetCreateCampaignCreate()),

    //   openAddBrandModal: _ => {
    //     dispatch(updateModalPath('addBrand'));
    //     dispatch(updateModalData({
    //     }));
    //     dispatch(openModal());
    //   }
    // }
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return _.assign({}, stateProps, dispatchProps, ownProps, {
    actions: {
      ...dispatchProps.actions,
      ...ownProps.actions
    }
  });
};

let DecoratedComponent = CreateContainer;
DecoratedComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(DecoratedComponent);
// DecoratedComponent = ui({
//   key: 'scene',
//   state: {
//   }
// })(DecoratedComponent);
DecoratedComponent = AuthenticationRequiredContainer()(DecoratedComponent);

export default DecoratedComponent;