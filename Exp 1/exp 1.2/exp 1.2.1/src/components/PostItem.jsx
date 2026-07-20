import { useDispatch } from "react-redux";

import { deletePost } from "../features/posts/postSlice";

const PostItem = ({ post, setEditingPost }) => {

  const dispatch = useDispatch();

  return (

    <div className="post-card">

      <h3>{post.title}</h3>

      <p>

        Platform: {post.platform}

      </p>

      <div className="actions">

        <button
          onClick={() => setEditingPost(post)}
        >
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={() => dispatch(deletePost(post.id))}
        >
          Delete
        </button>

      </div>

    </div>

  );

};

export default PostItem;
