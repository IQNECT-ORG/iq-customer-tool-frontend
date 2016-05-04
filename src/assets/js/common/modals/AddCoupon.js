import React, { Component } from 'react';
import Modal from 'app/modal/components/Modal';
import AddCouponForm from 'app/common/components/forms/AddCouponForm';
import serialize from 'form-serialize';
import { openModal, updateModalPath, updateModalData } from 'app/modal/actions';

class AddCoupon extends Component {
  static get contextTypes() {
    return {
      store: React.PropTypes.object.isRequired,
    };
  }

  render() {
    return (
      <Modal
        size='xs'
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onCloseClick}>
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" aria-label="Close" onClick={this.props.onCloseClick}>
              <span aria-hidden="true">&times;</span>
            </button>
            <h1>Add Coupon</h1>
          </div>

          <div className="modal-body">
            <AddCouponForm onBrowseClick={::this.handleBrowseClick}  onSubmit={::this.handleSubmit}/>
          </div>
        </div>
      </Modal>
    );
  }

  handleBrowseClick(e) {
    e.preventDefault();
    const dispatch = this.context.store.dispatch;
    dispatch(updateModalPath('campaignCouponBrowser'));
    // @TODO: Make this come from the prior data
    dispatch(updateModalData({
      form: this.props.data.form,
      field: this.props.data.field
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    const dispatch = this.context.store.dispatch;
    dispatch(updateModalPath('createCoupon'));
    // @TODO: Make this come from the prior data
    dispatch(updateModalData({
      form: this.props.data.form,
      field: this.props.data.field
    }));
    // dispatch(openModal());
  }
};

export default AddCoupon;