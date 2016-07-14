import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ui from 'redux-ui';
import { updateUI } from 'redux-ui/transpiled/action-reducer';
import { campaignLoadEditPage } from '../../signals';
import { modalOpen } from 'app/modal/signals';
import _ from 'lodash';
import { getUI } from 'app/core/selectors/ui';
import AuthenticationRequiredContainer from 'app/common/containers/AuthenticationRequiredContainer';
import EditPage from '../../components/pages/Edit';

class EditContainer extends Component {
  componentDidMount() {
    this.props.actions.load({
      campaignId: this.props.params.campaignId
    });
    this.props.actions.closeMenu();
  }

  componentWillUpdate(nextProps) {
  }

  render() {
    return (
      <EditPage {...this.props}/>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let campaign = state.entities.campaigns[ownProps.params.campaignId];
  let brand;
  if(campaign) {
    brand = state.entities.brands[campaign.defaultBrand];
  }

  let triggers = _.filter(state.entities.triggers, x => x.campaignId === ownProps.params.campaignId);

  const triggerIds = _.reduce(triggers, (r, x) => {
    r.push(x.triggerId);
    return r;
  }, []);

  let trainingResults = _.filter(state.entities.trainingResults, x => {
    return _.includes(triggerIds, x.triggerId);
  });


  let triggerPayloads = _.filter(state.entities.triggerPayloads, triggerPayloads, x => {
    return _.includes(triggerIds, x.triggerId);
  });

  return {
    steptrackerStep: _.get(getUI(state), 'scene.campaignPrint.step'),
    campaign,
    brand,
    triggers,
    trainingResults,
    triggerPayloads
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    actions: bindActionCreators({
      load: campaignLoadEditPage,
      modalOpen
    }, dispatch)

    // {
    //   load: payload => {
    //     dispatch(loadCampaignEditPage(payload));
    //   },
    //   closeMenu: _ => {
    //     dispatch(updateUI(['scene', 'drawNav'], 'isOpen', false));
    //   },
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

  });
};

let DecoratedComponent = EditContainer;
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