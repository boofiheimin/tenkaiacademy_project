import { AUTH, LOGOUT } from "../constants/actionTypes";

const reducer = (state = { user: null, isLogin: false }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("authToken", action.data.token);
      console.log({ ...state, user: action?.data?.user });
      return { ...state, user: action?.data?.user };
    case LOGOUT:
      localStorage.clear();
      return { ...state, user: null };
    default:
      return state;
  }
};

export default reducer;
