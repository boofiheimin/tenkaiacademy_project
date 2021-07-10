import * as api from "../api";
import { FETCH_ALL } from "../constants/actionTypes";

// Action Creators
export const getStreams = () => async (dispatch) => {
  try {
    const { data } = await api.fetchStreams();
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
