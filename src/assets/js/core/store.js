import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import customerToolReducer from './reducers/customerTool';
import createSagaMiddleware from 'redux-saga';
import saga from './sagas';

const sagaMiddleware = createSagaMiddleware(saga);

export const createAppStore = function() {
  const finalCreateStore = compose(
    applyMiddleware(thunk, sagaMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore);

  return finalCreateStore(customerToolReducer);
};