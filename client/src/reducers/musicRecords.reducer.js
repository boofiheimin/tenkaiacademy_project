import {
  FETCH_MUSICRECORDS_SUCCESS,
  CREATE_MUSICRECORD_SUCCESS,
} from "../constants/actionTypes";

const reducer = (records = [], action) => {
  switch (action.type) {
    case FETCH_MUSICRECORDS_SUCCESS:
      return action.data;
    case CREATE_MUSICRECORD_SUCCESS:
      return [...records, action.data];
    default:
      return records;
  }
};

export default reducer;
