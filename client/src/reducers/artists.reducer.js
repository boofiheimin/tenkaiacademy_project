import {
  FETCH_ARTISTS_SUCCESS,
  CREATE_ARTIST_SUCCESS,
  EDIT_ARTIST_SUCCESS,
  DELETE_ARTIST_SUCCESS,
} from "../constants/actionTypes";

const reducer = (artists = [], action) => {
  switch (action.type) {
    case FETCH_ARTISTS_SUCCESS:
      return action.data;
    case CREATE_ARTIST_SUCCESS:
      return [...artists, action.data];
    case EDIT_ARTIST_SUCCESS:
      return artists.map((artist) => {
        if (artist._id !== action.data._id) {
          return artist;
        }
        return {
          ...artist,
          ...action.data,
        };
      });
    case DELETE_ARTIST_SUCCESS:
      return artists.filter((artist) => artist._id !== action.data._id);
    default:
      return artists;
  }
};

export default reducer;
