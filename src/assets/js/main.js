import ReactDOM from 'react-dom';
import { createAppStore } from './core/store';
import React, { Component, PropTypes } from 'react';
import { Router, browserHistory } from 'react-router';
import routes from './core/routes';
import { syncHistoryWithStore } from 'react-router-redux';
import { IntlProvider, addLocaleData, defineMessages } from 'react-intl';
import enUS from './core/locales/en-us';
import enLocaleData from 'react-intl/locale-data/en';
import { Provider } from 'react-redux';

// Store
const store = createAppStore();
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: (state) => { return state.routing.toJS(); }
});

addLocaleData(enLocaleData);

ReactDOM.render((
  <Provider store={store}>
    <IntlProvider locale="en" messages={enUS.messages}>
      <Router history={history}>
        {routes}
      </Router>
    </IntlProvider>
  </Provider>
), document.getElementById('app'));