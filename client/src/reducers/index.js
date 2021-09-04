import { combineReducers } from "redux";
import streams from "./streams.reducer";
import clips from "./clips.reducer";
import auth from "./auth.reducer";
import tags from "./tags.reducer";
import artists from "./artists.reducer";
import global from "./global.reducer";

export default combineReducers({
  streams,
  auth,
  tags,
  global,
  clips,
  artists,
});
