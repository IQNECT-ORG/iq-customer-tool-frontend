import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import _ from 'lodash';
import ModalManager from 'app/modal/components/ModalManager';

import AddBrandModal from './modals/AddBrand';
import AddWebsiteModal from 'app/campaigns/print/components/modals/AddWebsite';

class App extends Component {
  constructor(props, context) {
    super(props);
    this.state = context.store.getState().toObject();

    _.bindAll(this, [
      'handleStoreChange'
    ]);
  }

  static get contextTypes() {
    return {
      store: React.PropTypes.object
    };
  }

  componentWillMount() {
    this.unsubscribe = this.context.store.subscribe(this.handleStoreChange);
  }

  componentWillUnmount() {
    this.context.store.unsubscribe(this.unsubscribe);
  }

  render() {
    var childrenWithProps = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, this.state);
    });
    
    return (
      <div>
        {childrenWithProps}
        <ModalManager
          path={this.state.modal.get('path')}
          paths={{
            addBrand: AddBrandModal,
            addWebsite: AddWebsiteModal
          }}/>
      </div>
    );
  }

  handleStoreChange() {
    this.setState(this.context.store.getState().toObject());
  }
};

export default DragDropContext(HTML5Backend)(App);