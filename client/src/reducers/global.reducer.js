import {
  VIDEO_MODE,
  SUCCESS_NOTIFICATION,
  ERROR_NOTIFICATION,
  CLEAR_NOTIFICATION,
  TOGGLE_SITE_MODE,
} from "../constants/actionTypes";
import {
  ALERT_SUCCESS,
  ALERT_ERROR,
  SITE_MODE_DARK,
  SITE_MODE_LIGHT,
} from "../constants/main";

const reducer = (
  state = {
    videoMode: false,
    notification: { type: ALERT_SUCCESS, message: "" },
    siteMode: SITE_MODE_DARK,
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
    case TOGGLE_SITE_MODE: {
      let newSiteMode = "";
      if (state.siteMode === SITE_MODE_DARK) {
        newSiteMode = SITE_MODE_LIGHT;
      } else {
        newSiteMode = SITE_MODE_DARK;
      }
      return {
        ...state,
        siteMode: newSiteMode,
      };
    }

    default:
      return state;
  }
};

export default reducer;
