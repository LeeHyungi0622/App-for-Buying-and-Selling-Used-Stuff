import { createWrapper } from 'next-redux-wrapper';
import { applyMiddleware, compose, createStore } from 'redux';
import rootReducer from './root-reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './root-saga';

const configureStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    const middleware = [sagaMiddleware];
    const enhancer = process.env.NODE_ENV === 'production' ?
        // 개발시에 필요한 middleware 추가 (redux-saga, thunk)
        compose(applyMiddleware(...middleware)) :
        composeWithDevTools(applyMiddleware(...middleware));
    const store = createStore(rootReducer, enhancer);
    store.sataTask = sagaMiddleware.run(rootSaga);
    return store;
};

const wrapper = createWrapper(configureStore, {
    debug: process.env.NODE_ENV === 'development',
});

export default wrapper;