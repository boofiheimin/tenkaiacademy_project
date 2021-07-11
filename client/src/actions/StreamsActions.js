import * as api from "../api";
import { FETCH_ALL } from "../constants/actionTypes";

// Action Creators
export const getStreams = (query, limit, offset) => async (dispatch) => {
  try {
    const {
      data: { docs },
    } = await api.fetchStreams({ query, limit, offset });

    dispatch({ type: FETCH_ALL, payload: docs });
  } catch (error) {
    console.log(error.message);
  }
};
