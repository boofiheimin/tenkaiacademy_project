import { combineReducers } from "redux";
import streams from "./StreamsReducer";
import auth from "./AuthReducer";
import tags from "./TagsReducer";

export default combineReducers({
  streams,
  auth,
  tags,
});
