import React, { Component } from 'react';
import Modal from 'app/modal/components/Modal';
import CouponBrowser from 'app/common/components/couponBrowser/CouponBrowser';
import serialize from 'form-serialize';
import { connect } from 'react-redux';
import { closeModal } from 'app/modal/actions';
import { change } from 'redux-form/lib/actions';
import { openModal, updateModalPath, updateModalData } from 'app/modal/actions';
import { getCoupons } from 'app/core/selectors/entities/coupons';
import { loadBrowseCouponsModal } from '../actions/modals';

class BrowseCoupons extends Component {

  componentDidMount() {
  }

  componentDidUpdate(prevProps) {
    if(this.props.isOpen === true && prevProps.isOpen === false) {
      this.props.actions.load();
    }
  }

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
            <h1>Coupon Browser</h1>
          </div>

          <div className="modal-body">
            <CouponBrowser coupons={this.props.coupons}/>
          </div>
        </div>
      </Modal>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    coupons: getCoupons(state)
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    actions: {
      load: _ => {
        dispatch(loadBrowseCouponsModal());
      }
    }
  };
}

let DecoratedComponent = BrowseCoupons;
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);

export default DecoratedComponent;