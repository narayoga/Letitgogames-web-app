import { GET_PROFILE } from "../actions/profile";

let initialState = {
  getProfileUser: false,
  getProfileLoading: false,
  getProfileError: false,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE:
      console.log("4. masuk reducer" + action);
      return {
        ...state,
        getProfileUser: action.payload.data,
        getProfileLoading: action.payload.loading,
        getProfileError: action.payload.errorMessage,
      };
    default:
      return state;
  }
};

export default profileReducer;
