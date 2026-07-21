import { useSelector } from "react-redux";
import PostItem from "./PostItem";

const PostList = ({ setEditingPost }) => {

  const posts = useSelector(
    (state) => state.posts.posts
  );

  return (

    <div className="post-list">

      <h2>Posts</h2>

      {

        posts.length === 0 ? (

          <p>No posts available.</p>

        ) : (

          posts.map((post) => (

            <PostItem
              key={post.id}
              post={post}
              setEditingPost={setEditingPost}
            />

          ))

        )

      }

    </div>

  );

};

export default PostList;
