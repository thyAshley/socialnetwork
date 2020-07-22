import * as types from "../constant/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuth: null,
  loading: true,
  user: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.REGISTER_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        token: payload.token,
        isAuth: true,
        loading: false,
      };
    case types.REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        loading: false,
        isAuth: false,
      };
    case types.USER_LOADED:
      return {
        ...state,
        isAuth: true,
        loading: false,
        user: payload,
      };
    case types.AUTH_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        loading: false,
        isAuth: false,
      };
    default:
      return state;
  }
};
