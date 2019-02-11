import {createStore, applyMiddleware, compose} from 'redux';
import {persistStore} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

let store;

export default (rootReducer, rootSaga) => {
  const sagaMiddleware = createSagaMiddleware();
  const enhancer = compose(applyMiddleware(sagaMiddleware, logger));
  store = createStore(rootReducer, enhancer);
  sagaMiddleware.run(rootSaga);
  const persistor = persistStore(store);

  return {persistor, store};
};
