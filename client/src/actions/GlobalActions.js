/* eslint-disable import/prefer-default-export */
import { VIDEO_MODE, CLEAR_NOTIFICATION } from "../constants/actionTypes";

export const setVideoMode = (status) => async (dispatch) => {
  dispatch({ type: VIDEO_MODE, status });
};

export const clearNotification = (dispatch) => {
  dispatch({ type: CLEAR_NOTIFICATION });
};
