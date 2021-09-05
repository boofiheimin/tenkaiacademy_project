import * as api from "../api";
import {
  FETCH_ARTISTS_SUCCESS,
  CREATE_ARTIST_SUCCESS,
  EDIT_ARTIST_SUCCESS,
  DELETE_ARTIST_SUCCESS,
} from "../constants/actionTypes";

export const getArtists = () => async (dispatch) => {
  try {
    const { data } = await api.fetchArtists();
    dispatch({ type: FETCH_ARTISTS_SUCCESS, data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createArtist = (artist) => async (dispatch) => {
  try {
    const { data } = await api.createArtist(artist);
    dispatch({ type: CREATE_ARTIST_SUCCESS, data });
  } catch (error) {
    console.log(error.message);
  }
};

export const editArtist = (id, artist) => async (dispatch) => {
  try {
    const { data } = await api.editArtist(id, artist);
    dispatch({ type: EDIT_ARTIST_SUCCESS, data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteArtist = (id) => async (dispatch) => {
  try {
    const { data } = await api.deleteArtist(id);
    dispatch({ type: DELETE_ARTIST_SUCCESS, data });
  } catch (error) {
    console.log(error.message);
  }
};
