import { combineReducers } from "redux";
import streams from "./StreamsReducer";
import auth from "./AuthReducer";
import tags from "./TagsReducer";
import global from "./GlobalReducer";

export default combineReducers({
  streams,
  auth,
  tags,
  global,
});
