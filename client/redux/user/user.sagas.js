import { all, fork, put, delay, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
    LOG_IN_FAILURE,
    LOG_OUT_SUCCESS,
    LOG_OUT_FAILURE,
    LOG_IN_SUCCESS,
    LOG_IN_REQUEST,
    LOG_OUT_REQUEST,
    SIGN_UP_REQUEST,
    SIGN_UP_SUCCESS,
    SIGN_UP_FAILURE
} from './user.types';

function logInAPI() {
    return axios.post('/post/login');
}

function* login(action) {
    try {
        console.log('saga login');
        // const result = yield call(logInAPI, action.data);
        yield delay(1000);
        yield put({
            type: LOG_IN_SUCCESS,
            data: action.data
        });
    } catch (error) {
        yield put({
            type: LOG_IN_FAILURE,
            data: error.response.data
        });
    }
}

function logOutAPI() {
    return axios.post('/post/logout');
}

function* logout(action) {
    try {
        console.log('saga logout');
        // const result = yield call(logOutAPI, action.data);
        yield delay(1000);
        yield put({
            type: LOG_OUT_SUCCESS,
            data: action.data
        });
    } catch (error) {
        yield put({
            type: LOG_OUT_FAILURE,
            data: error.response.data
        });
    }
}

function signUpAPI() {
    return axios.post('/post/signUp');
}

function* signUp() {
    try {
        console.log('saga logout');
        // const result = yield call(signUpAPI);
        yield delay(1000);
        yield put({
            type: SIGN_UP_SUCCESS
        });
    } catch (error) {
        console.log(error);
        yield put({
            type: SIGN_UP_FAILURE,
            data: error.response.data
        });
    }
}

function* watchLogIn() {
    yield takeLatest(LOG_IN_REQUEST, login);
}

function* watchLogOut() {
    yield takeLatest(LOG_OUT_REQUEST, logout);
}

function* watchSignUp() {
    yield takeLatest(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga() {
    yield all([
        fork(watchLogIn),
        fork(watchLogOut),
        fork(watchSignUp)
    ])
}