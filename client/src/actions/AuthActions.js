import * as api from "../api/index.js";

import { AUTH, LOGOUT } from "../constants/actionTypes";

export const login = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.logIn(formData);
    dispatch({ type: AUTH, data });
    navigate("/");
  } catch (err) {
    console.log(err);
  }
};

export const logout = (navigate) => async (dispatch) => {
  try {
    await api.logOut();
    dispatch({ type: LOGOUT });
    navigate("/");
  } catch (err) {
    console.log(err);
  }
};

export const authen = () => async (dispatch) => {
  if (localStorage.getItem("authToken")) {
    try {
      const { data } = await api.authen();
      dispatch({ type: AUTH, data });
    } catch (err) {
      dispatch({ type: LOGOUT });
    }
  }
};
