import { memo, useMemo } from "react";
import { useSelector } from "react-redux";

import { makeSelectFilteredPosts } from "../features/posts/selectors";

import PostItem from "./PostItem";

const PostList = ({ searchTerm }) => {

  const selectFilteredPosts = useMemo(
    () => makeSelectFilteredPosts(),
    []
  );

  const posts = useSelector((state) =>
    selectFilteredPosts(state, searchTerm)
  );

  return (

    <div className="post-list">

      <h2>Filtered Posts</h2>

      {

        posts.length === 0 ? (

          <p>No matching posts found.</p>

        ) : (

          posts.map((post) => (

            <PostItem
              key={post.id}
              post={post}
            />

          ))

        )

      }

    </div>

  );

};

export default memo(PostList);
