import axios from "axios";
import { setAlert } from "./alert";
import * as types from "../constant/types";

export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/posts");
    dispatch({
      type: types.GET_POSTS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: types.POST_ERROR,
      payload: {
        msg: error.response,
        status: error.response.status,
      },
    });
  }
};

export const addLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${postId}`);
    dispatch({
      type: types.UPDATE_LIKES,
      payload: { id: postId, likes: res.data.likes },
    });
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: types.POST_ERROR,
      payload: {
        msg: error.response,
        status: error.response.status,
      },
    });
  }
};
export const removeLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/unlike/${postId}`);
    dispatch({
      type: types.UPDATE_LIKES,
      payload: { id: postId, likes: res.data.likes },
    });
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: types.POST_ERROR,
      payload: {
        msg: error.response,
        status: error.response.status,
      },
    });
  }
};