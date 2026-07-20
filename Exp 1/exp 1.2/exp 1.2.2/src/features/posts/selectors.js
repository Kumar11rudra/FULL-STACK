import { createSelector } from "reselect";

const selectPostsState = (state) => state.posts.posts;

export const selectTotalPosts = createSelector(
  [selectPostsState],
  (posts) => posts.length
);

export const selectFacebookPosts = createSelector(
  [selectPostsState],
  (posts) =>
    posts.filter(
      (post) => post.platform === "Facebook"
    )
);

export const selectLinkedInPosts = createSelector(
  [selectPostsState],
  (posts) =>
    posts.filter(
      (post) => post.platform === "LinkedIn"
    )
);

export const selectTwitterPosts = createSelector(
  [selectPostsState],
  (posts) =>
    posts.filter(
      (post) => post.platform === "Twitter"
    )
);

export const makeSelectFilteredPosts = () =>
  createSelector(
    [
      selectPostsState,
      (_, searchTerm) => searchTerm,
    ],
    (posts, searchTerm) => {

      const keyword = searchTerm.toLowerCase();

      return posts.filter((post) =>
        post.title
          .toLowerCase()
          .includes(keyword)
      );

    }
  );
