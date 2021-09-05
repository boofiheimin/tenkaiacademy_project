import * as api from "../api";
import {
  FETCH_SONGS_SUCCESS,
  CREATE_SONG_SUCCESS,
  EDIT_SONG_SUCCESS,
  DELETE_SONG_SUCCESS,
} from "../constants/actionTypes";

export const getSongs = () => async (dispatch) => {
  try {
    const { data } = await api.fetchSongs();
    dispatch({ type: FETCH_SONGS_SUCCESS, data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createSong = (song) => async (dispatch) => {
  try {
    const { data } = await api.createSong(song);
    dispatch({ type: CREATE_SONG_SUCCESS, data });
  } catch (error) {
    console.log(error.message);
  }
};

export const editSong = (id, song) => async (dispatch) => {
  try {
    const { data } = await api.editSong(id, song);
    dispatch({ type: EDIT_SONG_SUCCESS, data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteSong = (id) => async (dispatch) => {
  try {
    const { data } = await api.deleteSong(id);
    dispatch({ type: DELETE_SONG_SUCCESS, data });
  } catch (error) {
    console.log(error.message);
  }
};
