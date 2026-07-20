import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
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

    updatePost: (state, action) => {
      const { id, title, platform } = action.payload;

      const post = state.posts.find((item) => item.id === id);

      if (post) {
        post.title = title;
        post.platform = platform;
      }
    },

    deletePost: (state, action) => {
      state.posts = state.posts.filter(
        (post) => post.id !== action.payload
      );
    },
  },
});

export const {
  addPost,
  updatePost,
  deletePost,
} = postSlice.actions;

export default postSlice.reducer;
