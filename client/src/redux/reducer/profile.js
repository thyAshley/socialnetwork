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
    case types.GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };
    case types.GET_GITHUB:
      return {
        ...state,
        reports: payload,
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
        repos: [],
        profile: null,
      };
    case types.UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case types.UPDATE_EDUCATION:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case types.DELETE_EXPERIENCE:
      console.log(payload);
      return {
        ...state,
        profile: {
          ...state.profile,
          experience: payload,
        },
        loading: false,
      };
    case types.DELETE_EDUCATION:
      console.log(payload);
      return {
        ...state,
        profile: {
          ...state.profile,
          education: payload,
        },
        loading: false,
      };
    default:
      return state;
  }
};
