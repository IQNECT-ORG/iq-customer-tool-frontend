import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import _ from 'lodash';
import ModalManager from 'app/modal/components/ModalManager';
import CampaignPrintModalRouter from 'app/campaigns/print/components/ModalRouter'

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
        <ModalManager>
          <CampaignPrintModalRouter campaignPrint={this.state.campaignPrint}/>
        </ModalManager>
      </div>
    );
  }

  handleStoreChange() {
    this.setState(this.context.store.getState().toObject());
  }
};

export default DragDropContext(HTML5Backend)(App);