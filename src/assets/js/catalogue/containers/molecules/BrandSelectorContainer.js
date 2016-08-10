import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//import ui from 'redux-ui';
import BrandSelectorList from 'app/common/components/molecules/BrandSelectorList';
import { getBrands } from 'app/core/selectors/entities/brands';
import _ from 'lodash';

const mapStateToProps = (state) => {
  return {
    brands: getBrands(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({

    }, dispatch)
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return _.assign({}, stateProps, dispatchProps, ownProps, {
    onOptionClick: (e, brand) => {
      // dispatch(updateModalPath('editBrand'));
      // dispatch(updateModalData({
      //   brandId: brand.brandId
      // }));
      // dispatch(openModal());
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