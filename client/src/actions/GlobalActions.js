/* eslint-disable import/prefer-default-export */
import {
  VIDEO_MODE,
  CLEAR_NOTIFICATION,
  TOGGLE_SITE_MODE,
} from "../constants/actionTypes";

export const setVideoMode = (status) => async (dispatch) => {
  dispatch({ type: VIDEO_MODE, status });
};

export const clearNotification = (dispatch) => {
  dispatch({ type: CLEAR_NOTIFICATION });
};

export const toggleSiteMode = (dispatch) => {
  console.log("nanede");
  dispatch({ type: TOGGLE_SITE_MODE });
};
