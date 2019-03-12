import Cookies from "js-cookie";
import { appApi } from "../../shared/api";

const authActionTypes = {
  LOAD_USER: "LOAD_USER",
  STORE_TOKEN: "STORE_TOKEN",
  LOAD_GOOGLE_AUTH_URL: "LOAD_GOOGLE_AUTH_URL"
};

export const loadGoogleAuthUrl = () => {
  return {
    type: authActionTypes.LOAD_GOOGLE_AUTH_URL,
    promise: appApi.get("auth/v1/google-auth/geturl")
  };
};

export const loadUser = () => {
  console.log("aaaaaaaaa");
  return {
    type: authActionTypes.LOAD_USER,
    promise: appApi.get("/auth/v1/user")
  };
};

export const storeToken = token => {
  Cookies.set("x-auth-token", token);

  return {
    type: authActionTypes.STORE_TOKEN,
    payload: token
  };
};

export { authActionTypes };
