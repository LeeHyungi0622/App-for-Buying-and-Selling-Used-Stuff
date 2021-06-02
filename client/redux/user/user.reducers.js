import { ADD_POST_TO_CURRENTUSER, FOLLOW_FAILURE, FOLLOW_REQUEST, FOLLOW_SUCCESS, LOG_IN_FAILURE, LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_OUT_FAILURE, LOG_OUT_REQUEST, LOG_OUT_SUCCESS, REMOVE_POST_OF_CURRENTUSER, SIGN_UP_FAILURE, SIGN_UP_REQUEST, SIGN_UP_SUCCESS, UNFOLLOW_FAILURE, UNFOLLOW_REQUEST, UNFOLLOW_SUCCESS } from './user.types';
import produce from 'immer';

const INITIAL_STATE = {
    logInLoading: false,
    logInDone: false,
    logInError: false,
    logOutLoading: false,
    logOutDone: false,
    logOutError: null,
    signUpLoading: false,
    signUpDone: false,
    signUpError: null,
    followLoading: false,
    followDone: false,
    followError: null,
    unfollowLoading: false,
    unfollowDone: false,
    unfollowError: null,
    currentUser: null,
    signUpData: {},
    loginData: {}
}

// login이 성공했다는 가정으로 사용할 dummy user 객체를 준비한다.
// data: email, password 포함
const dummyUser = (data) => ({
    ...data,
    nickname: 'lee',
    id: 1,
    Posts: [{ id: 1 }],
    Followings: [{ nickname: '부기초' }, { nickname: 'Chanho Lee' }, { nickname: 'neue zeal' }],
    Followers: [{ nickname: '부기초' }, { nickname: 'Chanho Lee' }, { nickname: 'neue zeal' }],
});

const userReducer = (state = INITIAL_STATE, action) => produce(state, (draft) => {
    switch (action.type) {
        case LOG_IN_REQUEST:
            draft.logInLoading = true;
            draft.logInError = null;
            draft.logInDone = false;
            break;
        case LOG_IN_SUCCESS:
            draft.logInLoading = false;
            draft.logInDone = true;
            draft.currentUser = dummyUser(action.data);
            break;
        case LOG_IN_FAILURE:
            draft.logInLoading = false;
            draft.logInError = action.error;
            break;
        case LOG_OUT_REQUEST:
            draft.logOutLoading = true;
            draft.logOutError = null;
            draft.logOutDone = false;
            break;
        case LOG_OUT_SUCCESS:
            draft.logOutLoading = false;
            draft.logOutDone = true;
            draft.currentUser = null;
            break;
        case LOG_OUT_FAILURE:
            draft.logOutLoading = false;
            draft.logOutError = action.error;
            break;
        case SIGN_UP_REQUEST:
            draft.signUpLoading = true;
            draft.signUpError = null;
            draft.signUpDone = false;
            break;
        case SIGN_UP_SUCCESS:
            draft.signUpLoading = false;
            draft.signUpDone = true;
            break;
        case SIGN_UP_FAILURE:
            draft.signUpLoading = false;
            draft.signUpError = action.error;
            break;
        case FOLLOW_REQUEST:
            draft.followLoading = true;
            draft.followError = null;
            draft.followDone = false;
            break;
        case FOLLOW_SUCCESS:
            draft.followLoading = false;
            draft.currentUser.Followings.push({ id: action.data });
            draft.followDone = true;
            break;
        case FOLLOW_FAILURE:
            draft.followLoading = false;
            draft.followError = action.error;
            break;
        case UNFOLLOW_REQUEST:
            draft.unfollowLoading = true;
            draft.unfollowError = null;
            draft.unfollowDone = false;
            break;
        case UNFOLLOW_SUCCESS:
            draft.unfollowLoading = false;
            draft.currentUser.Followings = draft.currentUser.Followings.filter((v) => v.id !== action.data);
            draft.unfollowDone = true;
            break;
        case UNFOLLOW_FAILURE:
            draft.unfollowLoading = false;
            draft.unfollowError = action.error;
            break;
        case ADD_POST_TO_CURRENTUSER:
            draft.currentUser.Posts.unshift({ id: action.data });
            break;
        case REMOVE_POST_OF_CURRENTUSER:
            draft.currentUser.Posts = draft.currentUser.Posts.filter((v) => v.id !== action.data);
            break;
        default:
            break;
    }
});

export default userReducer;