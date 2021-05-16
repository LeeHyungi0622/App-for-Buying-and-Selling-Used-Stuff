import { userTypes } from './user.types';

export const login = data => ({
    type: userTypes.LOG_IN,
    data
});

export const logout = () => ({
    type: userTypes.LOG_OUT
});