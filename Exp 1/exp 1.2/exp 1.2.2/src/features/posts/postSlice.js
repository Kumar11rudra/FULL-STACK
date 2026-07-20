import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [
    {
      id: 1,
      title: "React Redux Toolkit",
      platform: "LinkedIn",
    },
    {
      id: 2,
      title: "Memoized Selectors",
      platform: "Twitter",
    },
    {
      id: 3,
      title: "Frontend Performance",
      platform: "Facebook",
    },
  ],
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.posts.push({
        id: Date.now(),
        ...action.payload,
      });
    },
  },
});

export const { addPost } = postSlice.actions;

export default postSlice.reducer;
