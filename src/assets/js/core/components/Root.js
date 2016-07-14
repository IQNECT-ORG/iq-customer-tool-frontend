import React from 'react';
import enUS from '../locales/en-us';
import { getLang } from '../utils/locale';
import { Router } from 'react-router';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import routes from '../routes';

const Root = (props) => {
  return (
    <Provider store={props.store}>
      <IntlProvider locale={getLang()} messages={enUS.messages}>
        <Router history={props.history}>
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