import * as types from "../constant/types";
import axios from "axios";
import { setAlert } from "./alert";

// Register User
export const register = (name, email, password) => async (dispatch) => {
  try {
    const res = await axios.post("/api/user/signup", {
      name,
      email,
      password,
    });
    dispatch({
      type: types.REGISTER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const errs = error.response.data.errors;
    dispatch({
      type: types.REGISTER_FAIL,
    });
    if (errs) {
      errs.forEach((err) => dispatch(setAlert(err.msg, "danger")));
    }
    dispatch({
      type: types.REGISTER_FAIL,
    });
  }
};
