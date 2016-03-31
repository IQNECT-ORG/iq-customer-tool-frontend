import ReactDOM from 'react-dom';
import { createAppStore } from './core/store';
import React, { Component, PropTypes } from 'react';
import { Router, browserHistory } from 'react-router';
import routes from './core/routes';
import { syncHistoryWithStore } from 'react-router-redux';
import { IntlProvider, addLocaleData, defineMessages } from 'react-intl';
import enUS from './core/locales/en-us';
import enLocaleData from 'react-intl/locale-data/en';

// Store
const store = createAppStore();
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: (state) => { return state.get('routing').toJS(); }
});

addLocaleData(enLocaleData);

const Root = class extends Component {
  static get childContextTypes() {
    return {
      store: PropTypes.object
    };
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
    <IntlProvider locale="en" messages={enUS.messages}>
      <Router history={history}>
        {routes}
      </Router>
    </IntlProvider>
  </Root>
), document.getElementById('app'));