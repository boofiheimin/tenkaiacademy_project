import * as api from "../api";
import {
  FETCH_CLIPS_SUCCESS,
  FETCH_CLIPS_HASMORE,
  FETCH_CLIPS_HASMORE_SUCCESS,
  FETCH_CLIPS_HASMORE_DONE,
  FETCH_CLIP_SUCCESS,
  ERROR_NOTIFICATION,
  EDIT_CLIP_SUCCESS,
  SUCCESS_NOTIFICATION,
  ADD_CLIP_SUCCESS,
  DELETE_CLIP_SUCCESS,
  FETCH_CLIPS_LOADING,
  FETCH_CLIP_LOADING,
  CLIP_NOTFOUND,
} from "../constants/actionTypes";
import { VIDEOS_FETCH_LIMIT } from "../constants/main";

// Action Creators
export const getClips = (query) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_CLIPS_LOADING });
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

export const getClip = (id) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_CLIP_LOADING });
    const { data } = await api.fetchClip(id);
    dispatch({ type: FETCH_CLIP_SUCCESS, data });
  } catch (error) {
    dispatch({ type: CLIP_NOTFOUND });
  }
};

export const editClip = (id, formData) => async (dispatch) => {
  try {
    const { data } = await api.editClip(id, formData);
    dispatch({ type: EDIT_CLIP_SUCCESS, data });
    dispatch({ type: SUCCESS_NOTIFICATION, message: "Saved successfully" });
  } catch (error) {
    dispatch({ type: ERROR_NOTIFICATION, message: error.response.data.error });
  }
};

export const refetchClip = (id) => async (dispatch) => {
  try {
    const { data } = await api.refetchClip(id);
    dispatch({ type: EDIT_CLIP_SUCCESS, data });
    dispatch({ type: SUCCESS_NOTIFICATION, message: "Refetch successfully" });
  } catch (error) {
    dispatch({ type: ERROR_NOTIFICATION, message: error.response.data.error });
  }
};
export const addClip =
  (videoId, srcVideoIds, tag, navigate) => async (dispatch) => {
    try {
      const { data } = await api.addClip(videoId, srcVideoIds, tag);
      dispatch({ type: ADD_CLIP_SUCCESS, data, navigate });
      dispatch({
        type: SUCCESS_NOTIFICATION,
        message: "successfully add clip",
      });
      navigate(`/clips/${data._id}/edit`);
    } catch (error) {
      dispatch({
        type: ERROR_NOTIFICATION,
        message: error?.response?.data?.error,
      });
    }
  };

export const removeClip = (id) => async (dispatch) => {
  try {
    const { data } = await api.deleteClip(id);
    dispatch({ type: DELETE_CLIP_SUCCESS, data });
    dispatch({
      type: SUCCESS_NOTIFICATION,
      message: "successfully delete clip",
    });
  } catch (error) {
    dispatch({ type: ERROR_NOTIFICATION, message: error.response.data.error });
  }
};
