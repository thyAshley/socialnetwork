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

export const getPost = (postId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${postId}`);
    dispatch({
      type: types.GET_POST,
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

export const removePost = (postId) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/${postId}`);
    dispatch(setAlert("Post Removed", "success"));
    dispatch({
      type: types.DELETE_POSTS,
      payload: { id: postId },
    });
  } catch (error) {
    dispatch({
      type: types.POST_ERROR,
      payload: {
        msg: error.response,
      },
    });
  }
};

export const addPost = (text) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/posts`, {
      text,
    });
    dispatch({
      type: types.ADD_POST,
      payload: res.data.post,
    });
    dispatch(setAlert("Post Created", "success"));
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: types.POST_ERROR,
      payload: {
        msg: error.response,
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

export const addComment = (postId, data) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/posts/comment/${postId}`, data);
    dispatch({
      type: types.ADD_COMMENT,
      payload: res.data,
    });
    dispatch(setAlert("Comment Added", "success"));
  } catch (error) {
    dispatch({
      type: types.POST_ERROR,
      payload: {
        msg: error.response,
      },
    });
  }
};
export const delComment = (postId, commentId) => async (dispatch) => {
  try {
    console.log("trying");
    await axios.delete(`/api/posts/${postId}/${commentId}`);

    dispatch({
      type: types.REMOVE_COMMENT,
      payload: commentId,
    });
    dispatch(setAlert("Comment Removed", "success"));
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: types.POST_ERROR,
      payload: {
        msg: error.response,
      },
    });
  }
};
