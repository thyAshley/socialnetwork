import * as types from "../constant/types";

const initialState = [];

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.SET_ALERT:
      return [...state, payload];

    case types.CLEAR_ALERT:
      return state.filter((alert) => alert.id !== payload);

    default:
      return state;
  }
};
