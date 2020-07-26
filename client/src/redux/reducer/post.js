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
    case types.UPDATE_LIKES:
      console.log(payload.likes[0]);
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.id
            ? {
                ...post,
                likes: payload.likes[0],
              }
            : post
        ),
        loading: false,
      };
    default:
      return {
        ...state,
      };
  }
};
