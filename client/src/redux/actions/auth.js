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
    dispatch(loadUser());
  } catch (error) {
    const errs = error.response.data.errors;
    console.log(errs);
    dispatch({
      type: types.REGISTER_FAIL,
    });
    if (errs) {
      errs.forEach((err) => dispatch(setAlert(err.msg, "danger")));
    }
  }
};

// Login User
export const login = (email, password) => async (dispatch) => {
  try {
    const res = await axios.post("/api/auth/login", {
      email,
      password,
    });
    dispatch({
      type: types.LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (error) {
    const errs = error.response.data;
    console.log(errs);
    if (errs) {
      errs.forEach((err) => dispatch(setAlert(err.msg, "danger")));
    }
    dispatch({
      type: types.LOGIN_FAIL,
    });
  }
};

// Logout User
export const logout = () => async (dispatch) => {
  dispatch({
    type: types.CLEAR_PROFILE,
  });
  dispatch({
    type: types.LOGOUT,
  });
};
