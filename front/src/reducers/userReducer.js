import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import productService from "../services/products";
import recycleService from "../services/recycles";

const userSlice = createSlice({
  name: "users",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export const initializeUsers = () => {
  return (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem("AKAppSessionID");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
      productService.setToken(user.token);
      recycleService.setToken(user.token);
    }
  };
};

export default userSlice.reducer;
