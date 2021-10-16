import * as api from "../api";
import {
  FETCH_PAGINATED_MUSICRECORDS_SUCCESS,
  FETCH_MUSICRECORDS_SUCCESS,
  CREATE_MUSICRECORD_SUCCESS,
  EDIT_MUSICRECORD_SUCCESS,
  DELETE_MUSICRECORD_SUCCESS,
  ERROR_NOTIFICATION,
} from "../constants/actionTypes";

export const getPaginatedMusicRecords =
  (textSearch, noScuff, limit, page) => async (dispatch) => {
    try {
      const { data } = await api.fetchMusicRecords(
        textSearch,
        noScuff,
        limit,
        page
      );

      const { docs, totalDocs } = data;

      dispatch({
        type: FETCH_PAGINATED_MUSICRECORDS_SUCCESS,
        data: docs,
        total: totalDocs,
      });
    } catch (error) {
      dispatch({
        type: ERROR_NOTIFICATION,
        message: error.response.data.error,
      });
    }
  };
export const getMusicRecords = (textSearch, noScuff) => async (dispatch) => {
  try {
    const { data } = await api.fetchMusicRecords(textSearch, noScuff);

    dispatch({
      type: FETCH_MUSICRECORDS_SUCCESS,
      data,
    });
  } catch (error) {
    dispatch({
      type: ERROR_NOTIFICATION,
      message: error.response.data.error,
    });
  }
};

export const createMusicRecord = (recordData) => async (dispatch) => {
  try {
    const { data } = await api.createMusicRecord(recordData);
    dispatch({ type: CREATE_MUSICRECORD_SUCCESS, data });
  } catch (error) {
    dispatch({
      type: ERROR_NOTIFICATION,
      message: error.response.data.error,
    });
  }
};
export const editMusicRecord = (id, recordData) => async (dispatch) => {
  try {
    const { data } = await api.editMusicRecord(id, recordData);
    dispatch({ type: EDIT_MUSICRECORD_SUCCESS, data });
  } catch (error) {
    dispatch({
      type: ERROR_NOTIFICATION,
      message: error.response.data.error,
    });
  }
};

export const deleteMusicRecord = (id) => async (dispatch) => {
  try {
    const { data } = await api.deleteMusicRecord(id);
    dispatch({ type: DELETE_MUSICRECORD_SUCCESS, data });
  } catch (error) {
    dispatch({
      type: ERROR_NOTIFICATION,
      message: error.response.data.error,
    });
  }
};
