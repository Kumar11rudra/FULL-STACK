import { useState } from "react";

import "./App.css";

import PostForm from "./components/PostForm";
import PostList from "./components/PostList";

function App() {

  const [editingPost, setEditingPost] = useState(null);

  return (

    <div className="app">

      <header className="header">

        <h1>Redux Toolkit State Management</h1>

        <p>Experiment 1.2.1</p>

      </header>

      <PostForm
        editingPost={editingPost}
        setEditingPost={setEditingPost}
      />

      <PostList
        setEditingPost={setEditingPost}
      />

    </div>

  );

}

export default App;
