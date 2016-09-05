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
import { ModalPaths } from 'app/common/Constants';

class CreateContainer extends Component {
  componentDidMount() {
    if(this.props.params.brandId) {
      this.props.actions.campaignSelectBrand(this.props.params.brandId);
    }

    if(this.props.params.campaignTypeId) {
      this.props.actions.campaignSelectCampaignType(this.props.params.campaignTypeId);
    }

    if(this.props.params.brandId == null && this.props.params.campaignTypeId == null) {
      this.props.actions.campaignResetCreate();
    }

    this.props.actions.load();
    this.props.actions.closeMenu();
  }

  componentWillUpdate(nextProps) {
    if(nextProps.params.brandId && nextProps.params.brandId !== this.props.params.brandId) {
      nextProps.actions.campaignSelectBrand(nextProps.params.brandId);
    }

    if(nextProps.params.campaignTypeId && nextProps.params.campaignTypeId !== this.props.params.campaignTypeId) {
      nextProps.actions.campaignSelectCampaignType(nextProps.params.campaignTypeId);
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
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return _.assign({}, stateProps, dispatchProps, ownProps, {
    actions: {
      ...dispatchProps.actions,
      ...ownProps.actions
    },

    onAddBrandClick: () => {
      dispatchProps.actions.modalOpen({
        path: ModalPaths.BRAND_CREATE
      });
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