import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'app/modal/components/Modal';
import EditBrandFormContainer from '../containers/EditBrandFormContainer';
import { closeModal } from 'app/modal/actions';
import { change } from 'redux-form/lib/actions';
import { getBrands } from 'app/core/selectors/entities/brands';
import _ from 'lodash';

const mapStateToProps = (state, ownProps) => {
  const brand = _.find(getBrands(state), brand => {
    return brand.brandId === ownProps.data.brandId;
  });
  return {
    brand
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  };
};

class EditBrand extends Component {
  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onCloseClick}>
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" aria-label="Close" onClick={this.props.onCloseClick}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div className="modal-body">
            <EditBrandFormContainer
              brand={this.props.brand}/>
          </div>
        </div>
      </Modal>
    );
  }
};

let DecoractedComponent = EditBrand;
DecoractedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoractedComponent);
export default DecoractedComponent;