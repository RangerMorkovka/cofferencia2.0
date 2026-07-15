import axios from "axios";

export const instance = axios.create({
  baseURL: "https://cofferencia2-0.onrender.com",
});
instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");
  return config;
});

export default instance;
