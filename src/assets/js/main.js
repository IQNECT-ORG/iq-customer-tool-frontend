import ReactDOM from 'react-dom';
import { createAppStore } from './store';
import React, { Component, PropTypes } from 'react';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import { syncHistoryWithStore } from 'react-router-redux';
import { IntlProvider } from 'react-intl';

// Store
const store = createAppStore();
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: (state) => { return state.get('routing').toJS() }
});

// Action Creators

const Root = class extends Component {
  static get childContextTypes() {
    return {
      store: PropTypes.object
    }
  }

  getChildContext() {
    return {
      store
    };
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
};

ReactDOM.render((
  <Root>
    <IntlProvider locale="en">
      <Router history={history}>
        {routes}
      </Router>
    </IntlProvider>
  </Root>
), document.getElementById('app'));