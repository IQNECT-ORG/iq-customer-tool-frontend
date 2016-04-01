import React, { Component } from 'react';
import AddWebsite from './modals/AddWebsite';

class ModalRouter extends Component {
  render() {
    const ui = this.props.campaignPrint.get('ui').toJS();

    return (
      <AddWebsite isOpen={ui.addWebsiteModalOpen}/>
    );
  }
};

export default ModalRouter;