import {
  FETCH_CLIPS_SUCCESS,
  FETCH_CLIPS_HASMORE,
  FETCH_CLIPS_HASMORE_SUCCESS,
  FETCH_CLIPS_HASMORE_DONE,
  FETCH_CLIP_SUCCESS,
} from "../constants/actionTypes";
import { VIDEOS_FETCH_LIMIT } from "../constants/main";

const reducer = (
  state = {
    clips: [],
    hasMore: true,
    offset: 0,
    filter: {
      title: "",
      tags: [],
      uploader: "",
      from: null,
      to: null,
      sort: -1,
    },
    clip: {},
  },
  action
) => {
  switch (action.type) {
    case FETCH_CLIPS_SUCCESS:
      return {
        ...state,
        clips: action?.data,
        total: action?.total,
        hasMore: false,
        offset: 0,
      };
    case FETCH_CLIPS_HASMORE:
      return {
        ...state,
        clips: action?.data,
        total: action?.total,
        hasMore: true,
        offset: VIDEOS_FETCH_LIMIT,
      };
    case FETCH_CLIPS_HASMORE_SUCCESS:
      return {
        ...state,
        total: action?.total,
        clips: state.clips.concat(action?.data),
        hasMore: true,
        offset: VIDEOS_FETCH_LIMIT + state.offset,
      };
    case FETCH_CLIPS_HASMORE_DONE:
      return {
        ...state,
        total: action?.total,
        clips: state.clips.concat(action?.data),
        hasMore: false,
        offset: 0,
      };
    case FETCH_CLIP_SUCCESS:
      return { ...state, clip: action?.data };
    default:
      return state;
  }
};

export default reducer;
