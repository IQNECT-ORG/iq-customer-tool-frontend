import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import customerToolReducer from './reducers/customerTool';
import createSagaMiddleware from 'redux-saga';
import saga from './sagas';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';

const sagaMiddleware = createSagaMiddleware(saga);

export const createAppStore = function() {
  const finalCreateStore = compose(
    applyMiddleware(
      thunk,
      routerMiddleware(browserHistory),
      sagaMiddleware
    ),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore);

  return finalCreateStore(customerToolReducer);
};