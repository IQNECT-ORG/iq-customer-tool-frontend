import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducers';
import createSagaMiddleware from 'redux-saga';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';

export const sagaMiddleware = createSagaMiddleware();

const createAppStore = function() {
  const finalCreateStore = compose(
    applyMiddleware(
      routerMiddleware(browserHistory),
      sagaMiddleware
    ),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore);

  return finalCreateStore(reducer);
};

export const configureStore = () => {
  return createAppStore();
};