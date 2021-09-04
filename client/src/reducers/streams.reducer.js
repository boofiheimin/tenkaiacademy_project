import {
  FETCH_STREAMS_LOADING,
  FETCH_STREAMS_SUCCESS,
  FETCH_STREAMS_HASMORE,
  FETCH_STREAMS_HASMORE_SUCCESS,
  FETCH_STREAMS_HASMORE_DONE,
  FETCH_STREAM_SUCCESS,
  EDIT_STREAM_SUCCESS,
  REFETCH_ALL_STREAM_BEGIN,
  REFETCH_ALL_STREAM_SUCCESS,
  ADD_STREAM_SUCCESS,
  DELETE_STREAM_SUCCESS,
  FETCH_STREAM_LOADING,
  STREAM_NOTFOUND,
} from "../constants/actionTypes";

const reducer = (
  state = {
    streams: [],
    hasMore: true,
    refetching: false,
    loading: false,
    streamLoading: false,
    notFound: false,
  },
  action
) => {
  switch (action.type) {
    case FETCH_STREAMS_LOADING:
      return {
        ...state,
        streams: [],
        loading: true,
      };

    case FETCH_STREAMS_SUCCESS:
      return {
        ...state,
        streams: action?.data,
        total: action?.total,
        loading: false,
        hasMore: false,
      };
    case FETCH_STREAMS_HASMORE:
      return {
        ...state,
        streams: action?.data,
        total: action?.total,
        hasMore: true,
        loading: false,
      };
    case FETCH_STREAMS_HASMORE_SUCCESS:
      return {
        ...state,
        total: action?.total,
        streams: state.streams.concat(action?.data),
        hasMore: true,
      };
    case FETCH_STREAMS_HASMORE_DONE:
      return {
        ...state,
        total: action?.total,
        streams: state.streams.concat(action?.data),
        hasMore: false,
      };
    case FETCH_STREAM_LOADING:
      return {
        ...state,
        streamLoading: true,
      };
    case STREAM_NOTFOUND:
      return {
        ...state,
        notFound: true,
        streamLoading: false,
      };
    case FETCH_STREAM_SUCCESS:
      return { ...state, stream: action?.data, streamLoading: false };
    case EDIT_STREAM_SUCCESS:
      return { ...state, stream: { ...state.stream, ...action.data } };
    case REFETCH_ALL_STREAM_BEGIN:
      return { ...state, refetching: true };
    case REFETCH_ALL_STREAM_SUCCESS:
      return { ...state, refetching: false };
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
