import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Menu from '../../components/molecules/Menu';
import ui from 'redux-ui/transpiled';
import { sessionLogout } from '../../signals';
import _ from 'lodash';

const mapStateToProps = void 0;

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      sessionLogout
    }, dispatch)
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return _.assign({}, stateProps, dispatchProps, ownProps, {
    isCatalogueSubmenuOpen: ownProps.ui.isCatalogueSubmenuOpen,

    onToggleSubMenuClick: () => {
      const curr = ownProps.ui.isCatalogueSubmenuOpen;
      ownProps.updateUI('isCatalogueSubmenuOpen', !curr);
    },

    onLogoutClick: () => {
      dispatchProps.actions.sessionLogout();
    }
  });
};

let DecoratedComponent = Menu;
DecoratedComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(DecoratedComponent);
DecoratedComponent = ui({
  key: 'menu',
  state: {
    isCatalogueSubmenuOpen: false
  }
})(DecoratedComponent);

export default DecoratedComponent;