import axios from "axios";

import { setAlert } from "./alert";
import * as types from "../constant/types";

// Get current user profile
export const getUserProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/me");
    dispatch({ type: types.GET_PROFILE, payload: res.data });
  } catch (error) {
    dispatch({
      type: types.PROFILE_ERROR,
      payload: {
        msg: error.response.err,
        status: error.response.status,
      },
    });
  }
};

// create or update profile
export const addUserProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const res = await axios.post("/api/profile", formData);
    dispatch({ type: types.GET_PROFILE, payload: res.data });
    dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", "success"));

    if (!edit) {
      history.push("/dashboard");
    }
  } catch (error) {
    const errs = error.response.data.error.errors;
    console.log(errs);
    if (errs) {
      errs.forEach((err) => dispatch(setAlert(err.msg, "danger")));
    }

    dispatch({
      type: types.PROFILE_ERROR,
      payload: {
        msg: error.response.err,
        status: error.response.status,
      },
    });
  }
};

// Add Experience
export const addExperience = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const res = await axios.put("/api/profile/experience", formData);
    dispatch({ type: types.UPDATE_PROFILE, payload: res.data });
    dispatch(setAlert("Experience Added", "success"));
    history.push("/dashboard");
  } catch (error) {
    const errs = error.response.data.error.errors;
    console.log(errs);
    if (errs) {
      errs.forEach((err) => dispatch(setAlert(err.msg, "danger")));
    }

    dispatch({
      type: types.PROFILE_ERROR,
      payload: {
        msg: error.response.err,
        status: error.response.status,
      },
    });
  }
};

// Add Education
export const addEducation = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const res = await axios.put("/api/profile/education", formData);
    dispatch({ type: types.UPDATE_EDUCATION, payload: res.data });
    dispatch(setAlert("Education Added", "success"));
    history.push("/dashboard");
  } catch (error) {
    const errs = error.response.data.error.errors;
    if (errs) {
      errs.forEach((err) => dispatch(setAlert(err.msg, "danger")));
    }

    dispatch({
      type: types.PROFILE_ERROR,
      payload: {
        msg: error.response.err,
        status: error.response.status,
      },
    });
  }
};
