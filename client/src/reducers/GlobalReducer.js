import {
  VIDEO_MODE,
  SUCCESS_NOTIFICATION,
  ERROR_NOTIFICATION,
  CLEAR_NOTIFICATION,
} from "../constants/actionTypes";
import { ALERT_SUCCESS, ALERT_ERROR } from "../constants/main";

const reducer = (
  state = {
    videoMode: false,
    notification: { type: ALERT_SUCCESS, message: "" },
  },
  action
) => {
  switch (action.type) {
    case VIDEO_MODE:
      return { ...state, videoMode: action.status ?? false };
    case SUCCESS_NOTIFICATION:
      return {
        ...state,
        notification: {
          type: ALERT_SUCCESS,
          message: action.message,
        },
      };
    case ERROR_NOTIFICATION:
      return {
        ...state,
        notification: {
          type: ALERT_ERROR,
          message: action.message,
        },
      };
    case CLEAR_NOTIFICATION:
      return {
        ...state,
        notification: {
          ...state.notification,
          message: "",
        },
      };

    default:
      return state;
  }
};

export default reducer;
