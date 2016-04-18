import React, { Component } from 'react';
import Modal from 'app/modal/components/Modal';
import { closeModal } from 'app/modal/actions';
import { push } from 'react-router-redux/lib/actions';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => {
  return {
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onLeaveClick: _ => {
      dispatch(closeModal());
      dispatch(push('/'));
    }
  };
};

class Success extends Component {
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
            <h1>Success!</h1>
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.props.onLeaveClick}>
              Go to Dashboard
            </button>
          </div>
        </div>
      </Modal>
    );
  }
};

let DecoractedComponent = Success;
DecoractedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoractedComponent);
export default DecoractedComponent;