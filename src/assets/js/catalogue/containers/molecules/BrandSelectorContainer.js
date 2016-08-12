import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//import ui from 'redux-ui';
import BrandSelectorList from 'app/common/components/molecules/BrandSelectorList';
import { getBrandsOrderedByNewest } from 'app/core/selectors/entities/brands';
import _ from 'lodash';
import { modalOpen } from 'app/modal/signals';
import { ModalPaths } from 'app/common/Constants';
import { push } from 'react-router-redux/lib/actions';

const mapStateToProps = (state) => {
  return {
    brands: getBrandsOrderedByNewest(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      modalOpen,
      push
    }, dispatch)
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const editCTA = (brand) => {
    dispatchProps.actions.modalOpen({
      path: ModalPaths.BRAND_EDIT,
      data: {
        brandId: brand.brandId
      }
    });
  };

  return _.assign({}, stateProps, dispatchProps, ownProps, {
    onOptionClick: (e, brand) => {
      dispatchProps.actions.push({
        pathname: '/manage/campaigns',
        query: {
          brandId: brand.brandId
        }
      });
    },
    onViewClick: (e, brand) => {
      dispatchProps.actions.push(`/manage/brands/${brand.brandId}`);
    },
    onEditClick: (e, brand) => {
      editCTA(brand);
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