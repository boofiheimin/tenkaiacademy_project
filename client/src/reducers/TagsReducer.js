import {
  FETCH_TAGS_SUCCESS,
  CREATE_TAG_SUCCESS,
  EDIT_TAG_SUCCESS,
  DELETE_TAG_SUCCESS,
} from "../constants/actionTypes";

const reducer = (tags = [], action) => {
  switch (action.type) {
    case FETCH_TAGS_SUCCESS:
      return action.data;
    case CREATE_TAG_SUCCESS:
      return [...tags, action.data];
    case EDIT_TAG_SUCCESS:
      return tags.map((tag) => {
        if (tag._id !== action.data._id) {
          return tag;
        }
        return {
          ...tag,
          ...action.data,
        };
      });
    case DELETE_TAG_SUCCESS:
      return tags.filter((tag) => tag._id !== action.data._id);
    default:
      return tags;
  }
};

export default reducer;
