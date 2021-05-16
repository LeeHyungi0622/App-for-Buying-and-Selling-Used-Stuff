import { combineReducers } from 'redux';
import user from './user/user.reducers';
import post from './post/post.reducers';
import { HYDRATE } from 'next-redux-wrapper';

export default combineReducers({
    index: (state = {}, action) => {
        switch (action.type) {
            case HYDRATE:
                return {
                    ...state,
                    ...action.payload
                };
            default:
                return state;
        }
    },
    user,
    post
})