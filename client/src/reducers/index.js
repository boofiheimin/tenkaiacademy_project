import { combineReducers } from "redux";
import streams from "./StreamsReducer";
import clips from "./ClipsReducer";
import auth from "./AuthReducer";
import tags from "./TagsReducer";
import artists from "./ArtistsReducer";
import global from "./GlobalReducer";

export default combineReducers({
  streams,
  auth,
  tags,
  global,
  clips,
  artists,
});
