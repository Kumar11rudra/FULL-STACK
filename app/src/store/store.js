import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/posts/postSlice";

const store = configureStore({
  reducer: {
    posts: postReducer,
  },
});

export default store;
