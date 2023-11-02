import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "../reducers/notificationReducer";
import blogReducer from "../reducers/blogReducer";
import userReducer from "../reducers/userReducer";
import allUsersReducer from "../reducers/allUsersReducer";
import productReducer from "../reducers/productReducer";

const store = configureStore({
  reducer: {
    notifications: notificationReducer,
    blogs: blogReducer,
    users: userReducer,
    allUsers: allUsersReducer,
    product: productReducer,
  },
});

export default store;
