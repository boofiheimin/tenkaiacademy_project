import {
  FETCH_STREAMS_SUCCESS,
  FETCH_STREAMS_HASMORE,
  FETCH_STREAMS_HASMORE_SUCCESS,
  FETCH_STREAMS_HASMORE_DONE,
  FETCH_STREAM_SUCCESS,
  EDIT_STREAM_SUCCESS,
  REFETCH_ALL_STREAM_BEGIN,
  REFETCH_ALL_STREAM_SUCCESS,
  SET_STREAMS_FITLER,
  ADD_STREAM_SUCCESS,
  DELETE_STREAM_SUCCESS,
} from "../constants/actionTypes";
import { VIDEOS_FETCH_LIMIT } from "../constants/main";

const reducer = (
  state = {
    streams: [],
    hasMore: true,
    offset: 0,
    refetching: false,
    filter: {
      title: "",
      tags: [],
      uploader: "",
      from: null,
      to: null,
      sort: -1,
    },
  },
  action
) => {
  switch (action.type) {
    case FETCH_STREAMS_SUCCESS:
      return {
        ...state,
        streams: action?.data,
        total: action?.total,
        hasMore: false,
        offset: 0,
      };
    case FETCH_STREAMS_HASMORE:
      return {
        ...state,
        streams: action?.data,
        total: action?.total,
        hasMore: true,
        offset: VIDEOS_FETCH_LIMIT,
      };
    case FETCH_STREAMS_HASMORE_SUCCESS:
      return {
        ...state,
        total: action?.total,
        streams: state.streams.concat(action?.data),
        hasMore: true,
        offset: VIDEOS_FETCH_LIMIT + state.offset,
      };
    case FETCH_STREAMS_HASMORE_DONE:
      return {
        ...state,
        total: action?.total,
        streams: state.streams.concat(action?.data),
        hasMore: false,
        offset: 0,
      };
    case FETCH_STREAM_SUCCESS:
      return { ...state, stream: action?.data };
    case EDIT_STREAM_SUCCESS:
      return { ...state, stream: { ...state.stream, ...action.data } };
    case REFETCH_ALL_STREAM_BEGIN:
      return { ...state, refetching: true };
    case REFETCH_ALL_STREAM_SUCCESS:
      return { ...state, refetching: false };
    case SET_STREAMS_FITLER:
      return { ...state, filter: action?.data };
    case ADD_STREAM_SUCCESS:
      return state;
    case DELETE_STREAM_SUCCESS:
      return {
        ...state,
        streams: state.streams.filter(
          (stream) => stream._id !== action?.data._id
        ),
      };
    default:
      return state;
  }
};

export default reducer;
