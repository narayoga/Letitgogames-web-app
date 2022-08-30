import axios from "axios";
export const GET_LEADERBOARD = "GET_LEADERBOARD";

export const getLeaderboard = (data) => {
    return (dispatch) => {
        dispatch({
            type: GET_LEADERBOARD,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })
        axios.get(`https://letigogames-v1.herokuapp.com/games/${data}`)
            .then((res) => {
                const array = res.data.data
                const arrayMap = array.map((player) =>{
                    return{
                        game: player.Game.gamesname,
                        id: player.Player.id,
                        username: player.Player.username,
                        score: player.points
                    }
                })
                arrayMap.sort((a,b)=> {
                    return b.score - a.score
                })
                dispatch({
                    type: GET_LEADERBOARD,
                    payload: {
                        loading: false,
                        data: arrayMap,
                        errorMessage: false
                    }
                })
            })
            .catch((err) => {
                console.log("3. masuk error", id, data)
                dispatch({
                    type: GET_LEADERBOARD,
                    payload: {
                        loading: false,
                        data: false,
                        errorMessage: err.message
                    }
                })
            })
    }
}