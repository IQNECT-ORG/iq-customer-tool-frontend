import React from 'react';
import enUS from './core/locales/en-us';
import { getLang } from './core/utils/locale';
import { Router } from 'react-router';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';

const Root = (props) => {
  return (
    <Provider store={store}>
      <IntlProvider locale={getLang()} messages={enUS.messages}>
        <Router history={history}>
          {routes}
        </Router>
      </IntlProvider>
    </Provider>
  );
};

Root.displayName = 'Root';
Root.propTypes = {

};

export default Root;