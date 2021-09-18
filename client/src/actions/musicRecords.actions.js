import * as api from "../api";
import {
  FETCH_MUSICRECORDS_SUCCESS,
  CREATE_MUSICRECORD_SUCCESS,
  DELETE_MUSICRECORD_SUCCESS,
} from "../constants/actionTypes";

export const getMusicRecords = () => async (dispatch) => {
  try {
    const { data } = await api.fetchMusicRecords();
    console.log("bruh", data);
    dispatch({ type: FETCH_MUSICRECORDS_SUCCESS, data });
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

export const deleteMusicRecord = (id) => async (dispatch) => {
  try {
    const { data } = await api.deleteMusicRecord(id);
    dispatch({ type: DELETE_MUSICRECORD_SUCCESS, data });
  } catch (error) {
    console.log(error.message);
  }
};