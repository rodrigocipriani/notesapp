import { appApi } from "../../shared/api";

const authActionTypes = {
  LOAD_USER: "LOAD_USER"
};

export const loadUser = () => ({
  type: authActionTypes.LOAD_USER,
  promise: appApi.get("/auth/v1/user")
});

export { authActionTypes };
