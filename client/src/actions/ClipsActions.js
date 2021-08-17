import * as api from "../api";
import {
  FETCH_CLIPS_SUCCESS,
  FETCH_CLIPS_HASMORE,
  FETCH_CLIPS_HASMORE_SUCCESS,
  FETCH_CLIPS_HASMORE_DONE,
  FETCH_CLIP_SUCCESS,
  ERROR_NOTIFICATION,
  SET_CLIPS_FITLER,
} from "../constants/actionTypes";
import { VIDEOS_FETCH_LIMIT } from "../constants/main";

// Action Creators
export const getClips = (query) => async (dispatch) => {
  try {
    const { data } = await api.fetchClips({
      query,
      limit: VIDEOS_FETCH_LIMIT,
    });

    const { docs, totalDocs } = data;

    if (docs.length < VIDEOS_FETCH_LIMIT) {
      dispatch({ type: FETCH_CLIPS_SUCCESS, data: docs, total: totalDocs });
    } else {
      dispatch({ type: FETCH_CLIPS_HASMORE, data: docs, total: totalDocs });
    }
  } catch (error) {
    dispatch({ type: ERROR_NOTIFICATION, message: error.response.data.error });
  }
};

export const getMoreClips = (query, offset) => async (dispatch) => {
  try {
    const { data } = await api.fetchClips({
      query,
      limit: VIDEOS_FETCH_LIMIT,
      offset,
    });

    const { docs, totalDocs } = data;
    if (docs.length < VIDEOS_FETCH_LIMIT) {
      dispatch({
        type: FETCH_CLIPS_HASMORE_DONE,
        data: docs,
        total: totalDocs,
      });
    } else {
      dispatch({
        type: FETCH_CLIPS_HASMORE_SUCCESS,
        data: docs,
        total: totalDocs,
      });
    }
  } catch (error) {
    dispatch({ type: ERROR_NOTIFICATION, message: error.response.data.error });
  }
};

export const setClipsFilter = (filter) => async (dispatch) => {
  dispatch({ type: SET_CLIPS_FITLER, data: filter });
  try {
    const { data } = await api.fetchClips({
      query: filter,
      limit: VIDEOS_FETCH_LIMIT,
    });

    const { docs, totalDocs } = data;

    if (docs.length < VIDEOS_FETCH_LIMIT) {
      dispatch({ type: FETCH_CLIPS_SUCCESS, data: docs, total: totalDocs });
    } else {
      dispatch({ type: FETCH_CLIPS_HASMORE, data: docs, total: totalDocs });
    }
  } catch (error) {
    console.log(error.message);
    dispatch({ type: ERROR_NOTIFICATION, message: error.message });
  }
};

export const getClip = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchClip(id);
    dispatch({ type: FETCH_CLIP_SUCCESS, data });
  } catch (error) {
    dispatch({ type: ERROR_NOTIFICATION, message: error.response.data.error });
  }
};
