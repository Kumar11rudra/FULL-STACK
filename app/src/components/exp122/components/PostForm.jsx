import { useState } from "react";
import { useDispatch } from "react-redux";

import { addPost } from "../features/posts/postSlice";

const PostForm = () => {

  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState("Facebook");

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!title.trim()) return;

    dispatch(
      addPost({
        title,
        platform,
      })
    );

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
        onChange={(e) =>
          setPlatform(e.target.value)
        }
      >
        <option>Facebook</option>
        <option>LinkedIn</option>
        <option>Twitter</option>
        <option>Instagram</option>
      </select>

      <button type="submit">

        Add Post

      </button>

    </form>

  );

};

export default PostForm;
