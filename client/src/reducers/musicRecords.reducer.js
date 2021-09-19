import {
  FETCH_MUSICRECORDS_SUCCESS,
  CREATE_MUSICRECORD_SUCCESS,
  DELETE_MUSICRECORD_SUCCESS,
  EDIT_MUSICRECORD_SUCCESS,
} from "../constants/actionTypes";

const reducer = (records = [], action) => {
  switch (action.type) {
    case FETCH_MUSICRECORDS_SUCCESS:
      return action.data;
    case CREATE_MUSICRECORD_SUCCESS:
      return [...records, action.data];
    case EDIT_MUSICRECORD_SUCCESS:
      return records.map((record) => {
        if (record._id !== action.data._id) {
          return record;
        }
        return {
          ...record,
          ...action.data,
        };
      });
    case DELETE_MUSICRECORD_SUCCESS:
      return records.filter((record) => record._id !== action.data._id);
    default:
      return records;
  }
};

export default reducer;
