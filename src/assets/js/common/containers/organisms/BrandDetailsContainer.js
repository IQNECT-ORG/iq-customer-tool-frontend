import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BrandDetails from 'app/common/components/organisms/BrandDetails';
import { getBrands } from 'app/core/selectors/entities/brands';
import _ from 'lodash';
import brandActions from '../../actions/brands';
import { createSelector } from 'reselect';

const getBrandId = (state, props) => {
  return props.brandId;
};

const makeGetBrand = () => {
  return createSelector(
    getBrands, getBrandId,
    (brands, brandId) => {
      return brands[brandId];
    }
  );
};

const makeMapStateToProps = () => {
  const getBrand = makeGetBrand();

  const mapStateToProps = (state, ownProps) => {
    return {
      brand: getBrand(state, ownProps)
    };
  };

  return mapStateToProps;
};


const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      loadBrand: brandActions.fetch
    }, dispatch)
  };
};


const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return _.assign({}, stateProps, dispatchProps, ownProps, {
  });
};

class BrandDetailsContainer extends Component {

  componentWillMount() {
    this.props.actions.loadBrand({
      id: this.props.brandId
    });
  }

  render() {
    return (
      <BrandDetails {...this.props}/>
    );
  }
}

let DecoratedComponent = BrandDetailsContainer;
DecoratedComponent = connect(
  makeMapStateToProps,
  mapDispatchToProps,
  mergeProps
)(DecoratedComponent);

export default DecoratedComponent;