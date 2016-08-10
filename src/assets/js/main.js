import React from 'react';
import ReactDOM from 'react-dom';
import Root from './core/components/Root';
import { configureStore, sagaMiddleware } from './core/store';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { addLocaleData } from 'react-intl';
import enLocaleData from 'react-intl/locale-data/en';
import saga from './core/sagas';

// Store
const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: (state) => { return state.routing; }
});

addLocaleData(enLocaleData);

sagaMiddleware.run(saga);

ReactDOM.render((
  <Root store={store} history={history}/>
), document.getElementById('root'));