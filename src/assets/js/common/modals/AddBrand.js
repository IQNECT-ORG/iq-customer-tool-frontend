import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'app/modal/components/Modal';
import AddBrandFormContainer from '../containers/AddBrandFormContainer';
import { closeModal } from 'app/modal/actions';
import { change } from 'redux-form/lib/actions';

const mapStateToProps = (state, ownProps) => {
  return {
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  };
};

class AddBrand extends Component {
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
            <AddBrandFormContainer/>
          </div>
        </div>
      </Modal>
    );
  }
};

let DecoractedComponent = AddBrand;
DecoractedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoractedComponent);
export default DecoractedComponent;