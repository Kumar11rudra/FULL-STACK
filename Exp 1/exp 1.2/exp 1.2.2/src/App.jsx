import { useState } from "react";

import "./App.css";

import PostForm from "./components/PostForm";
import SearchBar from "./components/SearchBar";
import Statistics from "./components/Statistics";
import PostList from "./components/PostList";

function App() {

  const [searchTerm, setSearchTerm] = useState("");

  return (

    <div className="app">

      <header className="header">

        <h1>Memoized Selectors with Redux Toolkit</h1>

        <p>

          Experiment 1.2.2

        </p>

      </header>

      <PostForm />

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <Statistics />

      <PostList
        searchTerm={searchTerm}
      />

    </div>

  );

}

export default App;
