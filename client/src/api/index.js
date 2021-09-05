import axios from "axios";

const URL = process.env.REACT_APP_API_ROUTE || "http://localhost:5000/api/v1/";

const API = axios.create({ baseURL: URL });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("authToken")) {
    req.headers.Authorization = `Bearer ${localStorage.getItem("authToken")}`;
  }
  return req;
});

export const logIn = async (formData) => API.post("/auth/login", formData);
export const logOut = async () => API.post("/auth/logout");
export const authen = async () => API.get("/auth/authenticate");

export const fetchStreams = async (queryData) =>
  API.get("/streams", { params: { ...queryData } });
export const fetchStream = async (id) => API.get(`/streams/${id}`);
export const editStream = async (id, formData) =>
  API.patch(`/streams/${id}`, formData);
export const refetchAll = async () => API.get("/streams/refetchAll");
export const addStream = async (videoId) => API.post("/streams", { videoId });
export const deleteStream = async (id) => API.delete(`/streams/${id}`);
export const refetchStream = async (id) => API.patch(`/streams/refetch/${id}`);

export const fetchClips = async (queryData) =>
  API.get("/clips", { params: { ...queryData } });
export const fetchClip = async (id) => API.get(`/clips/${id}`);
export const editClip = async (id, formData) =>
  API.patch(`/clips/${id}`, formData);
export const refetchClip = async (id) => API.patch(`/clips/refetch/${id}`);
export const addClip = async (videoId, srcVideoIds, tag) =>
  API.post("/clips", { videoId, srcVideoIds, tag });
export const deleteClip = async (id) => API.delete(`/clips/${id}`);

export const fetchTags = async (clip) => API.get("/tags", { params: { clip } });
export const createTag = async (tagData) => API.post("/tags", tagData);
export const editTag = async (id, tagData) => API.patch(`/tags/${id}`, tagData);
export const deleteTag = async (id) => API.delete(`/tags/${id}`);

export const fetchArtists = async () => API.get("/artists");
export const createArtist = async (artistData) =>
  API.post("/artists", artistData);
export const editArtist = async (id, artistData) =>
  API.patch(`/artists/${id}`, artistData);
export const deleteArtist = async (id) => API.delete(`/artists/${id}`);

export const fetchSongs = async () => API.get("/songs");
export const createSong = async (songData) => API.post("/songs", songData);
export const editSong = async (id, songData) =>
  API.patch(`/songs/${id}`, songData);
export const deleteSong = async (id) => API.delete(`/songs/${id}`);
