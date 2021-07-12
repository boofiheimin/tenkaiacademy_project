import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api/v1/" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("authToken")) {
    req.headers.Authorization = `Bearer ${localStorage.getItem("authToken")}`;
  }
  return req;
});

export const logIn = (formData) => API.post("/auth/login", formData);
export const logOut = () => API.post("/auth/logout");
export const authen = () => API.get("/auth/authenticate");

export const fetchStreams = (queryData) =>
  API.get("/streams", { params: { ...queryData } });

export const fetchStream = (id) => API.get(`/streams/${id}`);
