import * as types from "../constant/types";

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case types.POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    default:
      return {
        ...state,
      };
  }
};
