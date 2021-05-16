import { postTypes } from './post.types';

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
    postAdded: false
}

const postReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case postTypes.ADD_POST:
            return {
                ...state,
                mainPost: [action.data, ...state.mainPost],
                postAdded: true
            };
        default:
            return {
                ...state
            };
    }
};

export default postReducer;