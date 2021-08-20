import {
  FETCH_CLIPS_SUCCESS,
  FETCH_CLIPS_HASMORE,
  FETCH_CLIPS_HASMORE_SUCCESS,
  FETCH_CLIPS_HASMORE_DONE,
  FETCH_CLIP_SUCCESS,
  EDIT_CLIP_SUCCESS,
  ADD_CLIP_SUCCESS,
  DELETE_CLIP_SUCCESS,
  FETCH_CLIP_LOADING,
  FETCH_CLIPS_LOADING,
  CLIP_NOTFOUND,
} from "../constants/actionTypes";

const reducer = (
  state = {
    clips: [],
    hasMore: true,
    loading: false,
    notFound: false,
    clipLoading: false,
  },
  action
) => {
  switch (action.type) {
    case FETCH_CLIPS_LOADING:
      return {
        ...state,
        clips: [],
        loading: true,
      };
    case FETCH_CLIPS_SUCCESS:
      return {
        ...state,
        clips: action?.data,
        total: action?.total,
        hasMore: false,
        loading: false,
      };
    case FETCH_CLIPS_HASMORE:
      return {
        ...state,
        clips: action?.data,
        total: action?.total,
        hasMore: true,
        loading: false,
      };
    case FETCH_CLIPS_HASMORE_SUCCESS:
      return {
        ...state,
        total: action?.total,
        clips: state.clips.concat(action?.data),
        hasMore: true,
      };
    case FETCH_CLIPS_HASMORE_DONE:
      return {
        ...state,
        total: action?.total,
        clips: state.clips.concat(action?.data),
        hasMore: false,
      };
    case FETCH_CLIP_LOADING:
      return {
        ...state,
        clipLoading: true,
      };
    case CLIP_NOTFOUND:
      return {
        ...state,
        notFound: true,
        clipLoading: false,
      };
    case FETCH_CLIP_SUCCESS:
      return { ...state, clip: action?.data, clipLoading: false };
    case EDIT_CLIP_SUCCESS:
      return { ...state, clip: { ...state.clip, ...action.data } };
    case ADD_CLIP_SUCCESS:
      return state;
    case DELETE_CLIP_SUCCESS:
      return {
        ...state,
        clips: state.clips.filter((clip) => clip._id !== action?.data._id),
      };
    default:
      return state;
  }
};

export default reducer;
