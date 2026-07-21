import { memo } from "react";

const PostItem = ({ post }) => {

  console.log("Rendered:", post.title);

  return (

    <div className="post-card">

      <h3>{post.title}</h3>

      <p>

        Platform: {post.platform}

      </p>

    </div>

  );

};

export default memo(PostItem);
