import {
  FETCH_SONGS_SUCCESS,
  CREATE_SONG_SUCCESS,
  EDIT_SONG_SUCCESS,
  DELETE_SONG_SUCCESS,
} from "../constants/actionTypes";

const reducer = (songs = [], action) => {
  switch (action.type) {
    case FETCH_SONGS_SUCCESS:
      return action.data;
    case CREATE_SONG_SUCCESS:
      return [...songs, action.data];
    case EDIT_SONG_SUCCESS:
      return songs.map((song) => {
        if (song._id !== action.data._id) {
          return song;
        }
        return {
          ...song,
          ...action.data,
        };
      });
    case DELETE_SONG_SUCCESS:
      return songs.filter((song) => song._id !== action.data._id);
    default:
      return songs;
  }
};

export default reducer;
