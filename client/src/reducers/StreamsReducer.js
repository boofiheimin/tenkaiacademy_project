import {
  FETCH_STREAM_SUCCESS,
  FETCH_STREAM_HASMORE,
  FETCH_STREAM_HASMORE_SUCCESS,
  FETCH_STREAM_HASMORE_DONE,
} from "../constants/actionTypes";
import { VIDEOS_FETCH_LIMIT } from "../constants/main";

const reducer = (state = { streams: [], hasMore: true, offset: 0 }, action) => {
  switch (action.type) {
    case FETCH_STREAM_SUCCESS:
      return { streams: action?.data, hasMore: false, offset: 0 };
    case FETCH_STREAM_HASMORE:
      return {
        streams: action?.data,
        hasMore: true,
        offset: VIDEOS_FETCH_LIMIT + state.offset,
      };
    case FETCH_STREAM_HASMORE_SUCCESS:
      return {
        streams: state.streams.concat(action?.data),
        hasMore: true,
        offset: VIDEOS_FETCH_LIMIT + state.offset,
      };
    case FETCH_STREAM_HASMORE_DONE:
      return {
        streams: state.streams.concat(action?.data),
        hasMore: false,
        offset: 0,
      };
    default:
      return state;
  }
};

export default reducer;
