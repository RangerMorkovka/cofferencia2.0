import axios from "axios";
const currentIP = window.location.hostname;
export const instance = axios.create({
 baseURL: `http://${currentIP}:5174`,
 //baseURL: "/",
});
instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");
  return config;
});

export default instance;
