import { createWrapper } from 'next-redux-wrapper';
import { applyMiddleware, compose, createStore } from 'redux';
import rootReducer from './root-reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const configureStore = () => {
    const middleware = [];
    const enhancer = process.env.NODE_ENV === 'production' ?
        // 개발시에 필요한 middleware 추가 (redux-saga, thunk)
        compose(applyMiddleware(...middleware)) :
        composeWithDevTools(applyMiddleware());
    const store = createStore(rootReducer, enhancer);
    return store;
};

const wrapper = createWrapper(configureStore, {
    debug: process.env.NODE_ENV === 'development',
});

export default wrapper;