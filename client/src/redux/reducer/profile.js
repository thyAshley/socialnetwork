import * as types from "../constant/types";

const initialState = {
  profile: null,
  profiles: null,
  repos: [],
  loading: true,
  error: false,
};

export default (state = initialState, actions) => {
  const { type, payload } = actions;
  switch (type) {
    case types.GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case types.PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case types.CLEAR_PROFILE:
      return {
        ...initialState,
        loading: false,
      };
    default:
      return state;
  }
};