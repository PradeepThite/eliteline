import { LOGIN_SUCCESS } from "./authTypes";

const initialState = {
    user: {},
    isLogIn: false
}


const authReducer = (state = initialState, action) => {
    switch (action.key) {
        case LOGIN_SUCCESS: return { ...state, ...action.payload }
        default:
            return state;
    }
}

export default authReducer;