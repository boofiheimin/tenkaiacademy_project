import { AUTH, LOGOUT, AUTH_ERROR } from "../constants/actionTypes";

const reducer = (state = { user: null, isLogin: false }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("authToken", action.data.token);
      return { ...state, user: action?.data?.user, isError: false };
    case AUTH_ERROR:
      localStorage.clear();
      return { ...state, user: null, isError: true };
    case LOGOUT:
      localStorage.clear();
      return { ...state, user: null, isError: false };
    default:
      return state;
  }
};

export default reducer;
