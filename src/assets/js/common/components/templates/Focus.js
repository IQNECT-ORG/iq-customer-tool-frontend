import React, { Component } from 'react';
import DrawNav from 'app/common/containers/organisms/DrawNavContainer';
import SystemAlertMessagesContainer from 'app/common/containers/molecules/SystemAlertMessagesContainer';

class FocusLayout extends Component {
  render() {
    const layoutRender = this.props.layoutRender || ::this.defaultLayoutRender;
    const messageRender = this.props.messageRender || ::this.defaultMessageRender;
    const contentRender = this.props.contentRender || ::this.defaultContentRender;

    return layoutRender(messageRender, contentRender);
  }

  defaultLayoutRender(messageRender, contentRender) {
    return (
      <div className="focus-layout">
        <main className="page-content" role="main">
          <div className="container-fluid">
            {messageRender()}
          </div>

          {contentRender()}
        </main>
      </div>
    );
  }

  defaultMessageRender() {
    return (
      <SystemAlertMessagesContainer/>
    );
  }

  defaultContentRender() {
    return this.props.children;
  }
};

export default FocusLayout;