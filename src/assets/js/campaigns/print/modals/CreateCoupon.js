import React, { Component } from 'react';
import Modal from 'app/modal/components/Modal';
import CreateCouponForm from 'app/common/containers/CreateCouponFormContanier';
import serialize from 'form-serialize';
import { connect } from 'react-redux';
import { closeModal } from 'app/modal/actions';
import { change } from 'redux-form/lib/actions';

class CreateCoupon extends Component {
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
            <CreateCouponForm onFormSubmit={this.props.onSubmit}/>
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
    onSubmit: () => {
      // @TODO: Get the coupon that was saved
      const changeAction = change(ownProps.data.field, '1');
      changeAction.form = ownProps.data.form;

      dispatch(changeAction);
      dispatch(closeModal());
    }
  };
}

let DecoratedComponent = CreateCoupon;
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);

export default DecoratedComponent;