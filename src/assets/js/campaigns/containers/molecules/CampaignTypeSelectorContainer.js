import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//import ui from 'redux-ui/transpiled';
import CampaignTypeSelectorList from 'app/common/components/molecules/CampaignTypeSelectorList';
import { campaignSelectCampaignType } from '../../signals';
import Constants from 'app/common/Constants';
import _ from 'lodash';

const mapStateToProps = (state, ownProps) => {
  return {
    campignTypes: _.values(Constants.CampaignTypes)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      campaignSelectCampaignType
    }, dispatch)
  };
};


const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return _.assign({}, stateProps, dispatchProps, ownProps, {
    onOptionClick: (e, campaignType) => {
      dispatchProps.actions.campaignSelectCampaignType(campaignType);
    }
  });
};

let DecoratedComponent = CampaignTypeSelectorList;
DecoratedComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(DecoratedComponent);
//DecoratedComponent = ui()(DecoratedComponent);

export default DecoratedComponent;