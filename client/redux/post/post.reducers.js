import { ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE } from './post.types';

const INITIAL_STATE = {
    mainPost: [{
        id: 1,
        User: {
            id: 1,
            nickname: 'Lee'
        },
        content: 'dummy data description1 #hash1 #hash2',
        Images: [{
                src: 'https://images.pexels.com/photos/3998365/pexels-photo-3998365.png'
            },
            {
                src: 'https://images.pexels.com/photos/12064/pexels-photo-12064.jpeg'
            },
            {
                src: 'https://images.pexels.com/photos/159775/library-la-trobe-study-students-159775.jpeg'
            }
        ],
        Comments: [{
                User: {
                    nickname: 'Sang',
                },
                content: 'comment1'
            },
            {
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
    addCommentLoading: false,
    addCommentDone: false,
    addCommentError: null
}


// dummy post data
const dummyPost = {
    id: 2,
    content: 'dummy data description',
    User: {
        id: 1,
        nickname: 'lee',
    },
    Images: [],
    Comments: []
}

const postReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_POST_REQUEST:
            return {
                ...state,
                addPostLoading: true,
                addPostDone: false,
                addPostError: null
            };
        case ADD_POST_SUCCESS:
            return {
                ...state,
                mainPost: [dummyPost, ...state.mainPost],
                addPostLoading: false,
                addPostDone: true
            };
        case ADD_POST_FAILURE:
            return {
                ...state,
                addPostLoading: false,
                addPostError: action.error
            };
        case ADD_COMMENT_REQUEST:
            return {
                ...state,
                addCommentLoading: true,
                addCommentDone: false,
                addCommentError: null
            };
        case ADD_COMMENT_SUCCESS:
            return {
                ...state,
                addCommentLoading: false,
                addCommentDone: true
            };
        case ADD_COMMENT_FAILURE:
            return {
                ...state,
                addCommentLoading: false,
                addCommentError: action.error
            };
        default:
            return {
                ...state
            };
    }
};

export default postReducer;