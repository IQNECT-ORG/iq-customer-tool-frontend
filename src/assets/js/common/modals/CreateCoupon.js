import React, { Component } from 'react';
import Modal from 'app/modal/components/Modal';
import CouponForm from 'app/common/containers/CouponFormContanier';
import serialize from 'form-serialize';
import { connect } from 'react-redux';
import { closeModal } from 'app/modal/actions';
import { change } from 'redux-form/lib/actions';
import { openModal, updateModalPath, updateModalData } from 'app/modal/actions';
import { couponCreateFormSubmit } from '../actions/coupons';

class CreateCoupon extends Component {
  render() {
    return (
      <Modal
        size='sm'
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onCloseClick}>
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" aria-label="Close" onClick={this.props.onCloseClick}>
              <span aria-hidden="true">&times;</span>
            </button>
            <h1>Add New Coupon</h1>
          </div>

          <div className="modal-body">
            <CouponForm onFormSubmit={this.props.onSubmit} onPreviewClick={this.props.onPreviewClick}/>
          </div>
        </div>
      </Modal>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit: (values) => {
      return new Promise((resolve, reject) => {
        dispatch(couponCreateFormSubmit({
          values: {
            title: values.couponName,
          },
          form: 'coupon',
          resolve,
          reject,
          ref: {
            form: this.props.data.form,
            field: this.props.data.field
          },
          isModal: true
        }));
      });
    },
    onPreviewClick: () => {
      dispatch(updateModalPath('previewCoupon'));
      dispatch(updateModalData({
      }));
    }
  };
}

let DecoratedComponent = CreateCoupon;
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);

export default DecoratedComponent;