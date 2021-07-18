import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api/v1/" });

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
export const refetchAll = async () => {
  API.get("/streams/refetch_all");
};

export const fetchTags = async () => API.get("/tags");
export const createTag = async (tagData) => API.post("/tags", tagData);
export const editTag = async (id, tagData) => API.patch(`/tags/${id}`, tagData);
export const deleteTag = async (id) => API.delete(`/tags/${id}`);
