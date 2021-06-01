import { all, fork, put, take, delay, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { ADD_POST_FAILURE, ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE, REMOVE_POST_REQUEST } from './post.types';
import { ADD_POST_TO_CURRENTUSER, REMOVE_POST_OF_CURRENTUSER } from '../user/user.types';

function addPostAPI(data) {
    return axios.post('/api/posts', data);
}

function* addPost(action) {
    try {
        // const result = yield call(addPostAPI);
        yield delay(1000);
        yield put({
            type: ADD_POST_SUCCESS,
            data: action.data,
        });
        // saga에서는 동시에 여러 action을 dispatch할 수 있기 때문에
        // 연속적으로 action을 dispatch한다.
        // current user의 post 리스트 객체에 추가된 포스트 추가
        yield put({
            type: ADD_POST_TO_CURRENTUSER,
            data: action.data.id,
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
        // const result = yield call(removePostAPI);
        yield delay(1000);
        yield put({
            type: REMOVE_POST_SUCCESS,
            data: action.data
        });
        yield put({
            type: REMOVE_POST_OF_CURRENTUSER,
            data: action.data,
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