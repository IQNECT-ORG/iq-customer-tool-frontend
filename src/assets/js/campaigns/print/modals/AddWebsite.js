import React, { Component } from 'react';
import Modal from 'app/modal/components/Modal';
import AddWebsiteForm from 'app/common/components/forms/AddWebsiteForm';
import serialize from 'form-serialize';
import { closeModal } from 'app/modal/actions';
import { change } from 'redux-form/lib/actions';

class AddWebsite extends Component {
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
            <AddWebsiteForm onSubmit={this.handleSubmit.bind(this)}/>
          </div>
        </div>
      </Modal>
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    const data = serialize(e.currentTarget, { hash: true });
    const dispatch = this.context.store.dispatch;
    const changeAction = change(this.props.data.field, data.url);
    changeAction.form = this.props.data.form;

    dispatch(closeModal());
    dispatch(changeAction);
  }
};

export default AddWebsite;