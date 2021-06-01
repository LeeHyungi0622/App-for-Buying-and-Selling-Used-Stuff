import { all, fork, put, take, delay, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { ADD_POST_FAILURE, ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE, REMOVE_POST_REQUEST } from './post.types';

function addPostAPI(data) {
    return axios.post('/api/posts', data);
}

function* addPost(action) {
    try {
        console.log('addPost saga');
        // const result = yield call(addPostAPI);
        yield delay(1000);
        yield put({
            type: ADD_POST_SUCCESS,
            data: action.data
        });
    } catch (error) {
        yield put({
            type: ADD_POST_FAILURE,
            data: error.response.data
        })
    }
}

function removePostAPI(data) {
    return axios.post('/api/posts', data);
}

function* removePost(action) {
    try {
        console.log('removePost saga');
        // const result = yield call(removePostAPI);
        yield delay(1000);
        yield put({
            type: REMOVE_POST_SUCCESS,
            data: action.data
        });
    } catch (error) {
        yield put({
            type: REMOVE_POST_FAILURE,
            data: error.response.data
        })
    }
}

function addCommentAPI(data) {
    return axios.post(`/api/post/${data.postId}/comment`, data);
}

function* addComment(action) {
    try {
        // const result = yield call(addCommentAPI);
        yield delay(1000);
        yield put({
            type: ADD_COMMENT_SUCCESS,
            data: action.data
        });
    } catch (error) {
        yield put({
            type: ADD_COMMENT_FAILURE,
            data: error.response.data
        });
    }
}

function* watchAddPost() {
    yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchRemovePost() {
    yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function* watchAddComment() {
    yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
    yield all([
        fork(watchAddPost),
        fork(watchRemovePost),
        fork(watchAddComment)
    ]);
}