import {
  FETCH_MUSICRECORDS_SUCCESS,
  CREATE_MUSICRECORD_SUCCESS,
  DELETE_MUSICRECORD_SUCCESS,
  EDIT_MUSICRECORD_SUCCESS,
  FETCH_PAGINATED_MUSICRECORDS_SUCCESS,
} from "../constants/actionTypes";

const reducer = (
  records = { paginatedData: [], total: 0, data: [] },
  action
) => {
  switch (action.type) {
    case FETCH_PAGINATED_MUSICRECORDS_SUCCESS:
      return { ...records, paginatedData: action.data, total: action.total };
    case FETCH_MUSICRECORDS_SUCCESS:
      return { ...records, data: action.data };
    case CREATE_MUSICRECORD_SUCCESS:
      return {
        ...records,
        data: [...records.data, action.data],
        total: action.total + 1,
      };
    case EDIT_MUSICRECORD_SUCCESS:
      return {
        ...records,
        data: records.data.map((record) => {
          if (record._id !== action.data._id) {
            return record;
          }
          return {
            ...record,
            ...action.data,
          };
        }),
      };
    case DELETE_MUSICRECORD_SUCCESS:
      return {
        ...records,
        data: records.data.filter((record) => record._id !== action.data._id),
        total: action.total - 1,
      };
    default:
      return records;
  }
};

export default reducer;
