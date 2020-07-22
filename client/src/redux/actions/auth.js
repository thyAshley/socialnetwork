import * as types from "../constant/types";
import axios from "axios";
import { setAlert } from "./alert";
import setAuthToken from "../../utils/setAuthToken";

// Load User
export const loadUser = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  setAuthToken(token);

  try {
    const res = await axios.get("/api/auth");
    dispatch({
      type: types.USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    console.log(error.msg);
    dispatch({
      type: types.AUTH_ERROR,
    });
  }
};

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
