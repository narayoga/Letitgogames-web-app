export const AUTHENTICATED = "AUTHENTICATED";

export  const authenticatedAction = (data) => {
    return (dispatch) => {
        const token = localStorage.getItem('token')
        const data = JSON.parse(localStorage.getItem('data')) 
        dispatch({
            type: AUTHENTICATED,
            payload: {
                token,
                data
            }
        })
    }
}