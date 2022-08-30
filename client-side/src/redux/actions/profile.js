import axios from "axios";

export const GET_PROFILE = "GET_PROFILE";
export const UPDATE_PROFILE = "UPDATE_PROFILE";

export const putProfile = (data) => {
  return (dispatch) => {
    //loading
    dispatch({
      type: GET_PROFILE,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    const id = data.id;
    console.log("masuk", data);

    //get API
    axios({
      method: "PUT",
      url: `https://letigogames-v1.herokuapp.com/profile/${id}`,
      timeout: 120000,
    })
      .then((response) => {
        //berhasil get api
        console.log(response);
        dispatch({
          type: GET_PROFILE,
          payload: {
            loading: false,
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        //gagal get api
        dispatch({
          type: GET_PROFILE,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};
