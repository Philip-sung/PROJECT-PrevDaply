import { compose, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { reduxBatch } from '@manaflair/redux-batch';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import { rootReducer, rootSaga } from '.';

const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

const enhancer = compose(
  composeWithDevTools(reduxBatch, applyMiddleware(...middlewares)),
);

const store = createStore(rootReducer, enhancer);
sagaMiddleware.run(rootSaga);
export default store;
