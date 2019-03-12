import { authActionTypes } from "./authActions";

const initialState = {
  user: [],
  googleAuthUrl: null,
  token: null,
  loading: {
    user: false,
    googleAuthUrl: false
  }
};

export default (state = initialState, action) => {
  if (action.error) {
    alert(action.error);
    return { ...state };
  }

  const type = action.type;

  if (type === authActionTypes.LOAD_USER) {
    if (action.ready) {
      return {
        ...state,
        user: action.payload.data,
        loading: { ...state.loading, user: false }
      };
    }
    return { ...state, loading: { ...state.loading, user: true } };
  }

  if (type === authActionTypes.LOAD_GOOGLE_AUTH_URL) {
    if (action.ready) {
      return {
        ...state,
        googleAuthUrl: action.payload.data,
        loading: { ...state.loading, googleAuthUrl: false }
      };
    }
    return { ...state, loading: { ...state.loading, googleAuthUrl: true } };
  }

  if (type === authActionTypes.STORE_TOKEN) {
    return { ...state, token: action.payload };
  }

  if (type === authActionTypes.LOAD_GOOGLE_AUTH_URL) {
    return { ...state, googleAuthUrl: action.payload };
  }

  return state;
};
