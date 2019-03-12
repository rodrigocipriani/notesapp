import axios from "axios";
import Cookies from "js-cookie";
import config from "../config";

const api = baseUrl => {
  let create = axios.create({
    baseURL: baseUrl,
    withCredentials: true
  });

  create.interceptors.request.use(
    config => {
      // config.headers["x-auth-token"] = "9f728404-fe19-4d60-a7ed-c49884ea399c";
      config.headers["x-auth-token"] = Cookies.get("x-auth-token");
      // config.headers.Authorization = localStorage.getItem("token");
      return config;
    },
    request => request,
    error => {
      error.msg = "Erro ao tentar enviar dados.";
      console.error(error.msg, error, error.request);
      return Promise.reject(error);
    }
  );

  create.interceptors.response.use(
    response => response,
    error => {
      const response = error.response;
      error.msg =
        response && response.data
          ? response.data.msg
          : "Erro ao tentar receber dados.";
      console.error(error.msg, error, error.response);
      return Promise.reject(error);
    }
  );

  return create;
};

const appApi = api(config.apiUrl);

export default api;
export { appApi };
