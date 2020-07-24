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
        msg: error,
        status: error,
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

export const delExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);
    dispatch(setAlert("Experience Deleted", "success"));

    dispatch({
      type: types.DELETE_EXPERIENCE,
      payload: res.data.experience,
    });
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

export const delEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);
    dispatch({
      type: types.DELETE_EDUCATION,
      payload: res.data.education,
    });

    dispatch(setAlert("Education Deleted", "success"));
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

// Delete Account and profile
export const delAccount = (id) => async (dispatch) => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    try {
      const res = axios.delete(`/api/auth/delete`);
      dispatch({ type: types.CLEAR_PROFILE });
      dispatch({ type: types.DELETE_ACCOUNT });
      dispatch(setAlert("Your Account has been permanantly deleted"));
    } catch (error) {
      dispatch({
        type: types.PROFILE_ERROR,
        payload: {
          msg: error.response.err,
          status: error.response.status,
        },
      });
    }
  }
};

// Get Profile
export const getProfiles = () => async (dispatch) => {
  dispatch({ type: types.CLEAR_PROFILE });
  try {
    const res = await axios.get("/api/profile");
    dispatch({ type: types.GET_PROFILES, payload: res.data });
  } catch (error) {
    dispatch({
      type: types.PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const getProfile = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/user/${id}`);
    dispatch({ type: types.GET_PROFILE, payload: res.data });
  } catch (error) {
    dispatch({
      type: types.PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const getGithubReports = (githubusername) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/github/${githubusername}`);
    dispatch({ type: types.GET_GITHUB, payload: res.data });
  } catch (error) {
    dispatch({
      type: types.PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
