import { combineReducers } from "redux";
import streams from "./StreamsReducer";
import auth from "./AuthReducer";

export default combineReducers({
  streams,
  auth,
});
