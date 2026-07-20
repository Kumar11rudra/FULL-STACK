import "./App.css";

import PostForm from "./components/PostForm";
import PostList from "./components/PostList";

function App() {

  return (

    <div className="app">

      <header className="header">

        <h1>Redux Toolkit State Management</h1>

        <p>

          Experiment 1.2.1

        </p>

      </header>

      <PostForm />

      <PostList />

    </div>

  );

}

export default App;
