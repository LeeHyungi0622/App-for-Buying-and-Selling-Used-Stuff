import { ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE, REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE, REMOVE_COMMENT_REQUEST, REMOVE_COMMENT_SUCCESS, REMOVE_COMMENT_FAILURE } from './post.types';
import shortId from 'shortid';
import produce from 'immer';

const INITIAL_STATE = {
    mainPosts: [{
        id: 1,
        User: {
            id: 1,
            nickname: 'lee'
        },
        content: 'dummy data description1 #hash1 #hash2',
        Images: [{
                id: shortId.generate(),
                src: 'https://images.pexels.com/photos/3998365/pexels-photo-3998365.png'
            },
            {
                id: shortId.generate(),
                src: 'https://images.pexels.com/photos/12064/pexels-photo-12064.jpeg'
            },
            {
                id: shortId.generate(),
                src: 'https://images.pexels.com/photos/159775/library-la-trobe-study-students-159775.jpeg'
            }
        ],
        Comments: [{
                id: shortId.generate(),
                User: {
                    nickname: 'Sang',
                },
                content: 'comment1'
            },
            {
                id: shortId.generate(),
                User: {
                    nickname: 'CHOI',
                },
                content: 'comment2'
            }
        ]
    }],
    imagePaths: [],
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

const postReducer = (state = INITIAL_STATE, action) => produce(state, (draft) => {
    switch (action.type) {
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