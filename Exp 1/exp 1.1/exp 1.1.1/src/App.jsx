import "./App.css";
import PostComposer from "./components/PostComposer";

function App() {
  return (
    <div className="app">

      <header className="header">
        <h1>Dynamic Social Media Post Composer</h1>

        <p>
          Experiment 1.1.1 - Multi Platform Post Composer
        </p>
      </header>

      <PostComposer />

    </div>
  );
}

export default App;
