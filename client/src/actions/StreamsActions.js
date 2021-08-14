import * as api from "../api";
import {
  FETCH_STREAMS_SUCCESS,
  FETCH_STREAMS_HASMORE,
  FETCH_STREAMS_HASMORE_SUCCESS,
  FETCH_STREAMS_HASMORE_DONE,
  FETCH_STREAM_SUCCESS,
  REFETCH_ALL_STREAM_BEGIN,
  EDIT_STREAM_SUCCESS,
  SUCCESS_NOTIFICATION,
  ERROR_NOTIFICATION,
  REFETCH_ALL_STREAM_SUCCESS,
  SET_STREAMS_FITLER,
  ADD_STREAM_SUCCESS,
  DELETE_STREAM_SUCCESS,
} from "../constants/actionTypes";
import { VIDEOS_FETCH_LIMIT } from "../constants/main";

// Action Creators
export const getStreams = (query) => async (dispatch) => {
  try {
    const { data } = await api.fetchStreams({
      query,
      limit: VIDEOS_FETCH_LIMIT,
    });

    const { docs, totalDocs } = data;

    if (docs.length < VIDEOS_FETCH_LIMIT) {
      dispatch({ type: FETCH_STREAMS_SUCCESS, data: docs, total: totalDocs });
    } else {
      dispatch({ type: FETCH_STREAMS_HASMORE, data: docs, total: totalDocs });
    }
  } catch (error) {
    dispatch({ type: ERROR_NOTIFICATION, message: error.response.data.error });
  }
};

export const getMoreStreams = (query, offset) => async (dispatch) => {
  try {
    const { data } = await api.fetchStreams({
      query,
      limit: VIDEOS_FETCH_LIMIT,
      offset,
    });

    const { docs, totalDocs } = data;
    if (docs.length < VIDEOS_FETCH_LIMIT) {
      dispatch({
        type: FETCH_STREAMS_HASMORE_DONE,
        data: docs,
        total: totalDocs,
      });
    } else {
      dispatch({
        type: FETCH_STREAMS_HASMORE_SUCCESS,
        data: docs,
        total: totalDocs,
      });
    }
  } catch (error) {
    dispatch({ type: ERROR_NOTIFICATION, message: error.response.data.error });
  }
};

export const getStream = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchStream(id);
    dispatch({ type: FETCH_STREAM_SUCCESS, data });
  } catch (error) {
    dispatch({ type: ERROR_NOTIFICATION, message: error.response.data.error });
  }
};

export const editStream = (id, formData) => async (dispatch) => {
  try {
    const { data } = await api.editStream(id, formData);
    dispatch({ type: EDIT_STREAM_SUCCESS, data });
    dispatch({ type: SUCCESS_NOTIFICATION, message: "Saved successfully" });
  } catch (error) {
    dispatch({ type: ERROR_NOTIFICATION, message: error.response.data.error });
  }
};

export const refetchAll = () => async (dispatch) => {
  try {
    dispatch({ type: REFETCH_ALL_STREAM_BEGIN });
    const { data } = await api.refetchAll();
    dispatch({ type: REFETCH_ALL_STREAM_SUCCESS });
    dispatch({ type: SUCCESS_NOTIFICATION, message: data.message });
    const { data: rData } = await api.fetchStreams({
      query: {},
      limit: VIDEOS_FETCH_LIMIT,
    });

    const { docs, totalDocs } = rData;

    if (docs.length < VIDEOS_FETCH_LIMIT) {
      dispatch({ type: FETCH_STREAMS_SUCCESS, data: docs, total: totalDocs });
    } else {
      dispatch({ type: FETCH_STREAMS_HASMORE, data: docs, total: totalDocs });
    }
  } catch (error) {
    dispatch({ type: ERROR_NOTIFICATION, message: error.response.data.error });
    dispatch({ type: REFETCH_ALL_STREAM_SUCCESS });
  }
};

export const setStreamsFilter = (filter) => async (dispatch) => {
  dispatch({ type: SET_STREAMS_FITLER, data: filter });
  try {
    const { data } = await api.fetchStreams({
      query: filter,
      limit: VIDEOS_FETCH_LIMIT,
    });

    const { docs, totalDocs } = data;

    if (docs.length < VIDEOS_FETCH_LIMIT) {
      dispatch({ type: FETCH_STREAMS_SUCCESS, data: docs, total: totalDocs });
    } else {
      dispatch({ type: FETCH_STREAMS_HASMORE, data: docs, total: totalDocs });
    }
  } catch (error) {
    console.log(error.message);
    dispatch({ type: ERROR_NOTIFICATION, message: error.message });
  }
};

export const addStream = (videoId, navigate) => async (dispatch) => {
  try {
    const { data } = await api.addStream(videoId);
    dispatch({ type: ADD_STREAM_SUCCESS, data, navigate });
    dispatch({
      type: SUCCESS_NOTIFICATION,
      message: "successfully add stream",
    });
    navigate(`/streams/${data._id}/edit`);
  } catch (error) {
    dispatch({ type: ERROR_NOTIFICATION, message: error.response.data.error });
  }
};

export const removeStream = (id) => async (dispatch) => {
  try {
    const { data } = await api.deleteStream(id);
    dispatch({ type: DELETE_STREAM_SUCCESS, data });
    dispatch({
      type: SUCCESS_NOTIFICATION,
      message: "successfully delete stream",
    });
  } catch (error) {
    dispatch({ type: ERROR_NOTIFICATION, message: error.response.data.error });
  }
};

export const refetchStream = (id) => async (dispatch) => {
  try {
    const { data } = await api.refetchStream(id);
    dispatch({ type: EDIT_STREAM_SUCCESS, data });
    dispatch({ type: SUCCESS_NOTIFICATION, message: "Refetch successfully" });
  } catch (error) {
    dispatch({ type: ERROR_NOTIFICATION, message: error.response.data.error });
  }
};
