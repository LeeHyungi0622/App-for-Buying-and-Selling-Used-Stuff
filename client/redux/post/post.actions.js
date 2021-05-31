import { ADD_COMMENT_REQUEST, ADD_POST_REQUEST, REMOVE_POST_REQUEST } from './post.types';

export const addPost = (data) => ({
    type: ADD_POST_REQUEST,
    data
});

export const removePost = (data) => ({
    type: REMOVE_POST_REQUEST,
    data
});

export const addComment = (data) => ({
    type: ADD_COMMENT_REQUEST,
    data
});

const dummyPostData = {
    id: 2,
    User: {
        id: 2,
        nickname: 'Kim'
    },
    content: 'dummy data description2 #hash3 #hash4',
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
                nickname: 'Hong',
            },
            content: 'comment3'
        },
        {
            User: {
                nickname: 'Geum',
            },
            content: 'comment4'
        }
    ]
};