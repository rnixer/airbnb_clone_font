import axios from "axios";
import { getToken } from "../utils/local-storage";
axios.defaults.baseURL = import.meta.env.VITE_API_URL;

axios.interceptors.request.use(
  //อ่าน doc axios.interceptors.request.use รับ config กับ error
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

export default axios;
