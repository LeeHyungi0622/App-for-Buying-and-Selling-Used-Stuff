import { FOLLOW_REQUEST, LOG_IN_REQUEST, LOG_OUT_REQUEST, UNFOLLOW_REQUEST } from './user.types';

export const loginRequestAction = data => ({
    type: LOG_IN_REQUEST,
    data
});

export const logoutRequestAction = ({
    type: LOG_OUT_REQUEST
});

export const followRequestAction = (data) => ({
    type: FOLLOW_REQUEST,
    data
});

export const unfollowRequestAction = (data) => ({
    type: UNFOLLOW_REQUEST,
    data
});