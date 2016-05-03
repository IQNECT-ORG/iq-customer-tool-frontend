import React, { Component } from 'react';
import Modal from 'app/modal/components/Modal';
import CouponForm from 'app/common/containers/CouponFormContanier';
import serialize from 'form-serialize';
import { connect } from 'react-redux';
import { closeModal } from 'app/modal/actions';
import { change } from 'redux-form/lib/actions';
import { openModal, updateModalPath, updateModalData } from 'app/modal/actions';
import { couponEditFormSubmit } from '../actions/coupons';
import { getCoupons } from 'app/core/selectors/entities/coupons';

class EditCoupon extends Component {
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
            <h1>Edit Coupon</h1>
          </div>

          <div className="modal-body">
            <CouponForm
              coupon={this.props.coupon}
              onFormSubmit={this.props.onSubmit}
              onPreviewClick={this.props.onPreviewClick}/>
          </div>
        </div>
      </Modal>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  const coupon = _.find(getCoupons(state), coupon => {
    return coupon.couponId === ownProps.data.couponId;
  });
  return {
    coupon
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit: (values) => {
      console.log(values);
      return new Promise((resolve, reject) => {
        dispatch(couponEditFormSubmit({
          values: {
            couponId: ownProps.data.couponId,
            title: values.couponName,
          },
          form: 'coupon',
          resolve,
          reject,
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

let DecoratedComponent = EditCoupon;
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);

export default DecoratedComponent;