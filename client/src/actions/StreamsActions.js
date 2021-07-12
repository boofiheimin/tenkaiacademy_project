import * as api from "../api";
import {
  FETCH_STREAMS_SUCCESS,
  FETCH_STREAMS_HASMORE,
  FETCH_STREAMS_HASMORE_SUCCESS,
  FETCH_STREAMS_HASMORE_DONE,
  FETCH_STREAM_SUCCESS,
} from "../constants/actionTypes";
import { VIDEOS_FETCH_LIMIT } from "../constants/main";

// Action Creators
export const getStreams = (query) => async (dispatch) => {
  try {
    const {
      data: { docs },
    } = await api.fetchStreams({
      query,
      limit: VIDEOS_FETCH_LIMIT,
    });

    if (docs.length < VIDEOS_FETCH_LIMIT) {
      dispatch({ type: FETCH_STREAMS_SUCCESS, data: docs });
    } else {
      dispatch({ type: FETCH_STREAMS_HASMORE, data: docs });
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const getMoreStreams = (query, offset) => async (dispatch) => {
  try {
    const {
      data: { docs },
    } = await api.fetchStreams({ query, limit: VIDEOS_FETCH_LIMIT, offset });

    if (docs.length < VIDEOS_FETCH_LIMIT) {
      dispatch({ type: FETCH_STREAMS_HASMORE_DONE, data: docs });
    } else {
      dispatch({ type: FETCH_STREAMS_HASMORE_SUCCESS, data: docs });
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const getStream = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchStream(id);
    dispatch({ type: FETCH_STREAM_SUCCESS, data });
  } catch (error) {
    console.log(error.message);
  }
};
