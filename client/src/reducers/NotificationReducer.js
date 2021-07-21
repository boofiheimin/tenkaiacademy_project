import {
  SUCCESS_NOTIFICATION,
  ERROR_NOTIFICATION,
} from "../constants/actionTypes";
import { ALERT_SUCCESS, ALERT_ERROR } from "../constants/main";

const reducer = (
  state = { type: ALERT_SUCCESS, message: false, toggleToken: false },
  action
) => {
  switch (action.type) {
    case SUCCESS_NOTIFICATION:
      return {
        ...state,
        type: ALERT_SUCCESS,
        message: action.message,
        toggleToken: !state.toggleToken,
      };
    case ERROR_NOTIFICATION:
      return {
        ...state,
        type: ALERT_ERROR,
        message: action.message,
        toggleToken: !state.toggleToken,
      };

    default:
      return state;
  }
};

export default reducer;
