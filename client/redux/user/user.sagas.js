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
    SIGN_UP_FAILURE,
    FOLLOW_REQUEST,
    UNFOLLOW_REQUEST,
    FOLLOW_SUCCESS,
    FOLLOW_FAILURE,
    UNFOLLOW_SUCCESS,
    UNFOLLOW_FAILURE
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

function followAPI() {
    return axios.post('/post/follow');
}

function* follow(action) {
    try {
        console.log('saga follow');
        // const result = yield call(followAPI);
        yield delay(1000);
        yield put({
            type: FOLLOW_SUCCESS,
            data: action.data
        });
    } catch (error) {
        console.log(error);
        yield put({
            type: FOLLOW_FAILURE,
            data: error.response.data
        });
    }
}

function unfollowAPI() {
    return axios.post('/post/unfollow');
}

function* unfollow(action) {
    try {
        console.log('saga unfollow');
        // const result = yield call(unfollowAPI);
        yield delay(1000);
        yield put({
            type: UNFOLLOW_SUCCESS,
            data: action.data
        });
    } catch (error) {
        console.log(error);
        yield put({
            type: UNFOLLOW_FAILURE,
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

function* watchFollow() {
    yield takeLatest(FOLLOW_REQUEST, follow);
}

function* watchUnfollow() {
    yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}

export default function* userSaga() {
    yield all([
        fork(watchLogIn),
        fork(watchLogOut),
        fork(watchSignUp),
        fork(watchFollow),
        fork(watchUnfollow),
    ])
}