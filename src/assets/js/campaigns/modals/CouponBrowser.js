import React, { Component } from 'react';
import Modal from 'app/modal/components/Modal';
import CouponBrowserContainer from '../containers/CouponBrowserContainer';
import { connect } from 'react-redux';
import { change } from 'redux-form/lib/actions';
import { loadCampaignCouponBrowserModal } from '../actions';

class CouponBrowser extends Component {

  componentDidMount(prevProps) {
    this.props.actions.load();
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
            <CouponBrowserContainer
              form={this.props.data.form}
              field={this.props.data.field}/>
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
    actions: {
      load: _ => {
        dispatch(loadCampaignCouponBrowserModal());
      }
    }
  };
}

let DecoratedComponent = CouponBrowser;
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);

export default DecoratedComponent;