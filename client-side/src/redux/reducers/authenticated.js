import { AUTHENTICATED } from "../actions/authenticated";

const initialState = {
    token: false,
    data: false
}

const authenticatedReducer = (state = initialState, action) => {
    switch(action.type) {
        case AUTHENTICATED:
            return{
                ...state,
                token: action.payload.token,
                data: action.payload.data
            }
        default:
            return state
    }
}

export default authenticatedReducer;