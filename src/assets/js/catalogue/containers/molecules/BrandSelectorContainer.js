import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//import ui from 'redux-ui';
import BrandSelectorList from 'app/common/components/molecules/BrandSelectorList';
import { getBrands } from 'app/core/selectors/entities/brands';
import _ from 'lodash';
import { modalOpen } from 'app/modal/signals';
import { ModalPaths } from 'app/common/Constants';

const mapStateToProps = (state) => {
  return {
    brands: getBrands(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      modalOpen
    }, dispatch)
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return _.assign({}, stateProps, dispatchProps, ownProps, {
    onOptionClick: (e, brand) => {
      dispatchProps.actions.modalOpen({
        path: ModalPaths.BRAND_EDIT,
        data: {
          brandId: brand.brandId
        }
      });
    }
  });
};

let DecoratedComponent = BrandSelectorList;
DecoratedComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(DecoratedComponent);
//DecoratedComponent = ui()(DecoratedComponent);

export default DecoratedComponent;