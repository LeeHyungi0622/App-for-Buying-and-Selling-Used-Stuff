import { all, fork } from 'redux-saga/effects';
import userSaga from './user/user.sagas';
import postSaga from './post/post.sagas';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3066';

export default function* rootSaga() {
    yield all([
        fork(postSaga),
        fork(userSaga)
    ]);
}