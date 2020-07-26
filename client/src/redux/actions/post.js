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
