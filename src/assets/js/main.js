import ReactDOM from 'react-dom';
import { createAppStore, sagaMiddleware } from './core/store';
import React, { Component, PropTypes } from 'react';
import { Router, browserHistory } from 'react-router';
import routes from './core/routes';
import { syncHistoryWithStore } from 'react-router-redux';
import { IntlProvider, addLocaleData } from 'react-intl';
import enUS from './core/locales/en-us';
import enLocaleData from 'react-intl/locale-data/en';
import { Provider } from 'react-redux';
import saga from './core/sagas';
import { getLang } from './core/utils/locale';

// Store
const store = createAppStore();
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: (state) => { return state.routing; }
});

addLocaleData(enLocaleData);

sagaMiddleware.run(saga);

ReactDOM.render((
  <Provider store={store}>
    <IntlProvider locale={getLang()} messages={enUS.messages}>
      <Router history={history}>
        {routes}
      </Router>
    </IntlProvider>
  </Provider>
), document.getElementById('app'));