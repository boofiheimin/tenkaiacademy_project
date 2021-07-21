import { VIDEO_MODE } from "../constants/actionTypes";

const reducer = (state = { videoMode: false }, action) => {
  switch (action.type) {
    case VIDEO_MODE:
      return { ...state, videoMode: action.status ?? false };
    default:
      return state;
  }
};

export default reducer;
