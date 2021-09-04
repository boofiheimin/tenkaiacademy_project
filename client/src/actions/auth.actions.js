import * as api from "../api/index";

import { AUTH, LOGOUT, AUTH_ERROR } from "../constants/actionTypes";

export const login = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.logIn(formData);
    dispatch({ type: AUTH, data });
    navigate("/");
  } catch (err) {
    if (err.response.status === 401) {
      dispatch({ type: AUTH_ERROR });
    }
  }
};

export const logout = (navigate) => async (dispatch) => {
  try {
    await api.logOut();
    dispatch({ type: LOGOUT });
    navigate("/");
  } catch (err) {
    console.log(err);
    dispatch({ type: AUTH_ERROR });
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
