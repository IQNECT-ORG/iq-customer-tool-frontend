import React, { Component } from 'react';
import Modal from 'app/modal/components/Modal';
import AddCouponForm from 'app/common/components/forms/AddCouponForm';
import serialize from 'form-serialize';
import {  } from '../actions';
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
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onCloseClick}>
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" aria-label="Close" onClick={this.props.onCloseClick}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div className="modal-body">
            <AddCouponForm  onSubmit={::this.handleSubmit}/>
          </div>
        </div>
      </Modal>
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    const dispatch = this.context.store.dispatch;
    dispatch(updateModalPath('createCoupon'));
    // dispatch(updateModalData({
    //   form: 'campaignPrintAllPages'
    // }));
    // dispatch(openModal());
  }
};

export default AddCoupon;