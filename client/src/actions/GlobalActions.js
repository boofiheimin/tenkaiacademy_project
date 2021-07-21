/* eslint-disable import/prefer-default-export */
import { VIDEO_MODE } from "../constants/actionTypes";

export const setVideoMode = (status) => async (dispatch) => {
  dispatch({ type: VIDEO_MODE, status });
};
