import { GET_LEADERBOARD } from "../actions/leaderboard"

const initialState = {
    getLeaderboardResult: false,
    getLeaderboardLoading: false,
    getLeaderboardError: false,
}

const leaderboardReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_LEADERBOARD:
            return{
                ...state,
                getLeaderboardResult: action.payload.data,
                getLeaderboardLoading: action.payload.loading,
                getLeaderboardError: action.payload.errorMessage
            }
        default:
            return state
    }
}

export default leaderboardReducer;