import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../features/posts/postSlice";

const PostList = () => {

  const dispatch = useDispatch();

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

            <div
              key={post.id}
              className="post-card"
            >

              <h3>{post.title}</h3>

              <p>

                Platform: {post.platform}

              </p>

              <button
                className="delete-btn"
                onClick={() =>
                  dispatch(deletePost(post.id))
                }
              >

                Delete

              </button>

            </div>

          ))

        )

      }

    </div>

  );

};

export default PostList;
