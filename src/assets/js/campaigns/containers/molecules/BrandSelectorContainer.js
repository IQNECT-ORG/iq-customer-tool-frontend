import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//import ui from 'redux-ui/transpiled';
import BrandSelectorList from 'app/common/components/brandSelector/BrandSelectorList';
import { getBrands } from 'app/core/selectors/entities/brands';
import { campaignSelectBrand } from '../../signals';
import _ from 'lodash';

const mapStateToProps = (state) => {
  return {
    brands: getBrands(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      campaignSelectBrand
    }, dispatch)
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return _.assign({}, stateProps, dispatchProps, ownProps, {
    onOptionClick: (e, brand) => {
      dispatchProps.actions.campaignSelectBrand(brand.brandId);
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