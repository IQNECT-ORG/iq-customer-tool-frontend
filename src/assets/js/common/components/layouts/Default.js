import React, { Component } from 'react';
import DrawNav from 'app/common/containers/DrawNavContainer';
import SystemAlertMessagesContainer from 'app/common/containers/SystemAlertMessagesContainer';

class DefaultLayout extends Component {
  render() {
    const layoutRender = this.props.layoutRender || ::this.defaultLayoutRender;
    const asideRender = this.props.asideRender || ::this.defaultAsideRender;
    const titleRender = this.props.titleRender || ::this.defaultTitleRender;
    const messageRender = this.props.messageRender || ::this.defaultMessageRender;
    const contentRender = this.props.contentRender || ::this.defaultContentRender;

    return layoutRender(asideRender, titleRender, messageRender, contentRender);
  }

  defaultLayoutRender(asideRender, titleRender, messageRender, contentRender) {
    return (
      <div>
        {asideRender()}
        <main className="page-content" role="main">
          {titleRender()}

          <div className="container-fluid">
            {messageRender()}
          </div>

          {contentRender()}
        </main>
      </div>
    );
  }

  defaultAsideRender() {
    return (
      <DrawNav/>
    );
  }

  defaultTitleRender() {
    return null;
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

export default DefaultLayout;