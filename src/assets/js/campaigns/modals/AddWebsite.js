import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'app/modal/components/Modal';
import AddWebsiteFormContainer from 'app/common/containers/AddWebsiteFormContainer';
import serialize from 'form-serialize';
import { closeModal } from 'app/modal/actions';
import { change } from 'redux-form/lib/actions';

const mapStateToProps = (state, ownProps) => {
  return {
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit: values => {
      const changeAction = change(ownProps.data.field, values.website);
      changeAction.form = ownProps.data.form;

      dispatch(closeModal());
      dispatch(changeAction);
    }
  };
};

class AddWebsite extends Component {
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
            <AddWebsiteFormContainer
              referenceForm={this.props.data.form}
              referenceField={this.props.data.field}
              onFormSubmit={this.props.onSubmit}/>
          </div>
        </div>
      </Modal>
    );
  }
};

let DecoractedComponent = AddWebsite;
DecoractedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoractedComponent);
export default DecoractedComponent;