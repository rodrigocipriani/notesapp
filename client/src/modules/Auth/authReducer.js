import { authActionTypes } from "./authActions";

const initialState = {
  user: [],
  loading: {
    user: false
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

  return state;
};
