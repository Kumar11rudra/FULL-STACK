import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import {
  addPost,
  updatePost,
} from "../features/posts/postSlice";

const PostForm = ({ editingPost, setEditingPost }) => {

  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState("Facebook");

  useEffect(() => {

    if (editingPost) {

      setTitle(editingPost.title);
      setPlatform(editingPost.platform);

    }

  }, [editingPost]);

  const handleSubmit = (e) => {

    e.preventDefault();

    if (title.trim() === "") {

      alert("Enter post title");

      return;

    }

    if (editingPost) {

      dispatch(
        updatePost({
          id: editingPost.id,
          title,
          platform,
        })
      );

      setEditingPost(null);

    } else {

      dispatch(
        addPost({
          title,
          platform,
        })
      );

    }

    setTitle("");
    setPlatform("Facebook");

  };

  return (

    <form className="post-form" onSubmit={handleSubmit}>

      <input
        type="text"
        placeholder="Enter post title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <select
        value={platform}
        onChange={(e) => setPlatform(e.target.value)}
      >
        <option>Facebook</option>
        <option>Instagram</option>
        <option>Twitter</option>
        <option>LinkedIn</option>
      </select>

      <button type="submit">

        {editingPost ? "Update Post" : "Add Post"}

      </button>

    </form>

  );

};

export default PostForm;
