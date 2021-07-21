import { combineReducers } from "redux";
import streams from "./StreamsReducer";
import auth from "./AuthReducer";
import tags from "./TagsReducer";
import notification from "./NotificationReducer";

export default combineReducers({
  streams,
  auth,
  tags,
  notification,
});
