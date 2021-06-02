import { ADD_COMMENT_REQUEST, ADD_POST_REQUEST, REMOVE_COMMENT_REQUEST, REMOVE_POST_REQUEST, LOAD_POST_REQUEST } from './post.types';

export const loadPost = ({
    type: LOAD_POST_REQUEST
});

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

export const removeComment = (data) => ({
    type: REMOVE_COMMENT_REQUEST,
    data
});