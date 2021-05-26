import { all, fork } from 'redux-saga/effects';
import userSaga from './user/user.sagas';
import postSaga from './post/post.sagas';

export default function* rootSaga() {
    yield all([
        fork(postSaga),
        fork(userSaga)
    ]);
}