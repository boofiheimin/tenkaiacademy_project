import * as api from "../api";
import {
  FETCH_MUSICRECORDS_SUCCESS,
  CREATE_MUSICRECORD_SUCCESS,
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

export const createMusicRecord = (song) => async (dispatch) => {
  try {
    const { data } = await api.createMusicRecord(song);
    dispatch({ type: CREATE_MUSICRECORD_SUCCESS, data });
  } catch (error) {
    console.log(error.message);
  }
};
