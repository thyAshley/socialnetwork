import * as types from "../constant/types";
import * as uuid from "uuid";

export const setAlert = (msg, alertType, timeout = 2500) => {
  return (dispatch) => {
    const id = uuid.v4();
    dispatch({
      type: types.SET_ALERT,
      payload: {
        id,
        msg,
        alertType,
      },
    });

    setTimeout(() => {
      dispatch({ type: types.CLEAR_ALERT, payload: id });
    }, timeout);
  };
};
