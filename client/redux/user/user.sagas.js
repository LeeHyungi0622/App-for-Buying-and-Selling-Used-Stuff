import { all, fork, put, delay, takeLatest, call } from 'redux-saga/effects';
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

function logInAPI(data) {
    return axios.post('/user/login', data);
}

function* login(action) {
    try {
        const result = yield call(logInAPI, action.data);
        yield put({
            type: LOG_IN_SUCCESS,
            data: result.data
        });
    } catch (error) {
        yield put({
            type: LOG_IN_FAILURE,
            data: error.response.data
        });
    }
}

function logOutAPI() {
    return axios.post('/user/logout');
}

function* logout(action) {
    try {
        yield call(logOutAPI);
        yield put({
            type: LOG_OUT_SUCCESS,
            data: action.data,
        });
    } catch (error) {
        console.log(error);
        yield put({
            type: LOG_OUT_FAILURE,
            data: error.response.data
        });
    }
}

function signUpAPI(data) {
    return axios.post('/user', data);
}

function* signUp(action) {
    try {
        console.log('signup saga', action);
        const result = yield call(signUpAPI, action.data);
        console.log('RESULT:', result);
        yield put({
            type: SIGN_UP_SUCCESS,
            data: action.data,
        });
    } catch (error) {
        yield put({
            type: SIGN_UP_FAILURE,
            error: error.response.data
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