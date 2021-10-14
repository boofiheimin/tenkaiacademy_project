import * as api from "../api";
import {
  FETCH_MUSICRECORDS_SUCCESS,
  CREATE_MUSICRECORD_SUCCESS,
  EDIT_MUSICRECORD_SUCCESS,
  DELETE_MUSICRECORD_SUCCESS,
} from "../constants/actionTypes";

export const getMusicRecords =
  (textSearch, limit, page) => async (dispatch) => {
    try {
      const { data } = await api.fetchMusicRecords(textSearch, limit, page + 1);

      const { docs, totalDocs } = data;

      dispatch({
        type: FETCH_MUSICRECORDS_SUCCESS,
        data: docs,
        total: totalDocs,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

export const createMusicRecord = (recordData) => async (dispatch) => {
  try {
    const { data } = await api.createMusicRecord(recordData);
    dispatch({ type: CREATE_MUSICRECORD_SUCCESS, data });
  } catch (error) {
    console.log(error.message);
  }
};
export const editMusicRecord = (id, recordData) => async (dispatch) => {
  try {
    const { data } = await api.editMusicRecord(id, recordData);
    dispatch({ type: EDIT_MUSICRECORD_SUCCESS, data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteMusicRecord = (id) => async (dispatch) => {
  try {
    const { data } = await api.deleteMusicRecord(id);
    dispatch({ type: DELETE_MUSICRECORD_SUCCESS, data });
  } catch (error) {
    console.log(error.message);
  }
};
