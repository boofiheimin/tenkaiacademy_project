import * as api from "../api";
import {
  FETCH_TAGS_SUCCESS,
  CREATE_TAG_SUCCESS,
  EDIT_TAG_SUCCESS,
  DELETE_TAG_SUCCESS,
} from "../constants/actionTypes";

export const getTags = () => async (dispatch) => {
  try {
    const { data } = await api.fetchTags();
    dispatch({ type: FETCH_TAGS_SUCCESS, data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createTag = (tag) => async (dispatch) => {
  try {
    const { data } = await api.createTag(tag);
    dispatch({ type: CREATE_TAG_SUCCESS, data });
  } catch (error) {
    console.log(error.message);
  }
};

export const editTag = (id, tag) => async (dispatch) => {
  try {
    const { data } = await api.editTag(id, tag);
    dispatch({ type: EDIT_TAG_SUCCESS, data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteTag = (id) => async (dispatch) => {
  try {
    const { data } = await api.deleteTag(id);
    console.log(data);
    dispatch({ type: DELETE_TAG_SUCCESS, data });
  } catch (error) {
    console.log(error.message);
  }
};
