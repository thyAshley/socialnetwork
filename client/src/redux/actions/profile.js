import axios from "axios";

import * as types from "../constant/types";
import { setAlert } from "./alert";

// Get current user profile
export const getUserProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/me");
    dispatch({ type: types.GET_PROFILE, payload: res.data });
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: types.PROFILE_ERROR,
      payload: {
        msg: error.response.err,
        status: error.response.status,
      },
    });
  }
};
