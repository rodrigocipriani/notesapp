import { appActionTypes } from "./appActions";

const initialState = {
  user: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case appActionTypes.LOGIN:
      return state;
    case appActionTypes.LOGOUT:
      return state;
    default:
      return state;
  }
};
