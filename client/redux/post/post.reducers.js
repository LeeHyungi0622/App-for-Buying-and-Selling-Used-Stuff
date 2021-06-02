import { ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE, REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE, REMOVE_COMMENT_REQUEST, REMOVE_COMMENT_SUCCESS, REMOVE_COMMENT_FAILURE, LOAD_POST_REQUEST, LOAD_POST_SUCCESS, LOAD_POST_FAILURE } from './post.types';
import shortId from 'shortid';
import produce from 'immer';
import faker, { fake } from 'faker';

const INITIAL_STATE = {
    mainPosts: [],
    imagePaths: [],
    hasMorePosts: true,
    loadPostLoading: false,
    loadPostDone: false,
    loadPostError: null,
    addPostLoading: false,
    addPostDone: false,
    addPostError: null,
    removePostLoading: false,
    removePostDone: false,
    removePostError: null,
    addCommentLoading: false,
    addCommentDone: false,
    addCommentError: null,
    removeCommentLoading: false,
    removeCommentDone: false,
    removeCommentError: null
}

// dummy post data
const dummyPost = (data) => ({
    id: data.id,
    content: data.content,
    User: {
        id: 1,
        nickname: 'lee',
    },
    Images: [],
    Comments: []
});

const dummyComment = (data) => ({
    id: shortId.generate(),
    content: data,
    User: {
        id: 1,
        nickname: 'lee',
    },
    Images: [],
    Comments: [],
});

// faker를 사용해서 dummy 데이터 넣기
export const generateDummyPost = (number) => Array(number).fill().map(() => ({
    id: shortId.generate(),
    User: {
        id: shortId.generate(),
        nickname: faker.name.findName(),
    },
    content: faker.lorem.paragraph(),
    Images: [{
        src: faker.image.image(),
    }],
    Comments: [{
        User: {
            id: shortId.generate(),
            nickname: faker.name.findName(),
        },
        content: faker.lorem.sentence(),
    }, ],
}));

const postReducer = (state = INITIAL_STATE, action) => produce(state, (draft) => {
    switch (action.type) {
        case LOAD_POST_REQUEST:
            draft.loadPostLoading = true;
            draft.loadPostDone = false;
            draft.loadPostError = null;
            break;
        case LOAD_POST_SUCCESS:
            draft.loadPostLoading = false;
            draft.loadPostDone = true;
            // 서버로부터 호출한 데이터(dummy post data)와 기존 게시물 데이터를 접붙인다.
            draft.mainPosts = draft.mainPosts.concat(action.data);
            // 최대 50개까지 게시물을 확인하기 위해 제한
            draft.hasMorePosts = draft.mainPosts.length < 50;
            break;
        case LOAD_POST_FAILURE:
            draft.loadPostLoading = false;
            draft.loadPostError = action.error;
            break;
        case ADD_POST_REQUEST:
            draft.addPostLoading = true;
            draft.addPostDone = false;
            draft.addPostError = null;
            break;
        case ADD_POST_SUCCESS:
            draft.mainPosts.unshift(dummyPost(action.data));
            draft.addPostLoading = false;
            draft.addPostDone = true;
            break;
        case ADD_POST_FAILURE:
            draft.addPostLoading = false;
            draft.addPostError = action.error;
            break;
        case REMOVE_POST_REQUEST:
            draft.removePostLoading = true;
            draft.removePostDone = false;
            draft.removePostError = null;
            break;
        case REMOVE_POST_SUCCESS:
            draft.removePostLoading = false;
            draft.removePostDone = true;
            draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data);
            break;
        case REMOVE_POST_FAILURE:
            draft.removePostLoading = false;
            draft.removePostError = action.error;
            break;
        case ADD_COMMENT_REQUEST:
            draft.addCommentLoading = true;
            draft.addCommentDone = false;
            draft.addCommentError = null;
            break;
        case ADD_COMMENT_SUCCESS:
            const post = draft.mainPosts.find((v) => v.id === action.data.postId);
            draft.addCommentLoading = false;
            draft.addCommentDone = true;
            post.Comments.unshift(dummyComment(action.data.content));
            break;
        case ADD_COMMENT_FAILURE:
            draft.addCommentLoading = false;
            draft.addCommentError = action.error;
            break;
        case REMOVE_COMMENT_REQUEST:
            draft.removeCommentLoading = true;
            draft.removeCommentDone = false;
            draft.removeCommentError = null;
            break;
        case REMOVE_COMMENT_SUCCESS:
            const targetPost = draft.mainPosts.find((v) => v.id === action.data.postId);
            draft.removeCommentLoading = false;
            draft.removeCommentDone = true;
            targetPost.Comments = targetPost.Comments.filter((v) => v.id !== action.data.commentId);
            break;
        case REMOVE_COMMENT_FAILURE:
            draft.removeCommentLoading = false;
            draft.removeCommentError = action.error;
            break;
        default:
            break;
    }
});

export default postReducer;