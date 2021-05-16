import { userTypes } from './user.types';

const INITIAL_STATE = {
    isLoggedIn: false,
    currentUser: null,
    signUpData: {},
    loginData: {}
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case userTypes.LOG_IN:
            return {
                ...state,
                isLoggedIn: true,
                currentUser: action.data
            };
        case userTypes.LOG_OUT:
            return {
                ...state,
                isLoggedIn: false,
                currentUser: null
            }
        default:
            return state;
    }
};

export default userReducer;