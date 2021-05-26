import { LOG_IN_REQUEST, LOG_OUT_REQUEST } from './user.types';

export const loginRequestAction = data => ({
    type: LOG_IN_REQUEST,
    data
});

export const logoutRequestAction = ({
    type: LOG_OUT_REQUEST
});