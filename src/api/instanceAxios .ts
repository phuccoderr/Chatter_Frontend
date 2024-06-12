import { API_URL } from "@/constants/common";
import { TokenUtils } from "@/utils/token-utils";
import axios from "axios";

const instanceAxios = axios.create({ baseURL: `${API_URL}` });

instanceAxios.interceptors.request.use((config) => {
  const access_token = `Bearer ${TokenUtils.getAccessToken()}`;

  if (access_token) {
    config.headers.Authorization = access_token;
  }

  config.baseURL = API_URL;
  return config;
});

instanceAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("info");

      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error.response.data);
  },
);

export default instanceAxios;
